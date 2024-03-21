import { ConfigProvider, Slider, message } from "antd";
import { BsFillSkipEndFill } from "react-icons/bs";
import { BsFillSkipStartFill } from "react-icons/bs";
import { AiTwotonePauseCircle } from "react-icons/ai";
import { AiTwotonePlayCircle } from "react-icons/ai";

import { timetampTotime } from "../../../global/timestampTotime";
import { useSelector, useDispatch } from "react-redux";
import * as _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { RootState } from "../../../store/store";
import { updateinfo } from "../../../store/features/persist/CurrentMusicSlice";
import { Tooltip, Spin } from "antd";
import { updateposition } from "../../../store/features/temporary/TimepositionSlice";
import Request from "../../../api/RequestMusic";
import { SongApiDefinition } from "../../../domains/song";

interface CenterProps {
  songid: string;
  playback: number;
  duration: number;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

export default function Center({
  duration,
  audioRef,
  songid,
  playback,
}: CenterProps) {
  const { list, length } = useSelector((state: RootState) => state.songlist);
  // 控制播放器 播放
  const [isPlaying, setIsPlaying] = useState(false);
  // 播放到第几个音乐
  const [currentTrackIndex, setCurrentTrackIndex] = useState(
    list.findIndex((item) => item.songid === songid)
  );

  const [music, setMusic] = useState("");
  const dispatch = useDispatch();
  // 音乐位置
  const [position, setPosition] = useState(0);
  // 音乐的加载状态
  const [Loading, setLoading] = useState(false);
  const { volume } = useSelector((state: RootState) => state.volume);

  // songid变化时就发送请求
  useEffect(() => {
    const res = Request.get(SongApiDefinition.getSongUrl.url, {
      params: {
        id: songid,
      },
    });
    res
      .then((value) => {
        setMusic(value.data.data[0].url);
      })
      .catch((e) => {
        console.error(e);
      });
    setCurrentTrackIndex(list.findIndex((item) => item.songid === songid));
  }, [songid]);

  useEffect(() => {
    if (music) {
      audioRef.current!.volume = volume / 100;
    }
  }, [music]);

  // 播放按钮
  const handlePlayPauseClick = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play(); // 如果音频暂停，则播放
      setIsPlaying(true);
    } else {
      audioRef.current?.pause(); // 如果音频正在播放，则暂停
      setIsPlaying(false);
    }
  };

  // 点击下一首
  const handleNextClick = (action: number) => {
    // 播放下一首歌曲
    const nextTrackIndex = (currentTrackIndex + action + length) % length;
    console.log(songid, nextTrackIndex);
    // 更新redux中currentmusic;
    dispatch(
      updateinfo({
        songid: list[nextTrackIndex].songid,
        songname: list[nextTrackIndex].songname,
        artistid: list[nextTrackIndex].artistid,
        artistname: list[nextTrackIndex].artistname,
        picUrl: list[nextTrackIndex].picUrl,
        duration: list[nextTrackIndex].dt,
      })
    );
    setCurrentTrackIndex(nextTrackIndex);
    setIsPlaying(true); // 自动播放下一首
  };

  // 结束之后自动播放下一首
  const handleAutoNext = () => {
    if (list.length === 1) {
      setIsPlaying(false);
    } else {
      // 列表循环
      if (playback === 1) {
        handleNextClick(1);
        // 顺序播放
      } else if (playback === 2) {
        if (currentTrackIndex === length - 1) {
          setIsPlaying(false);
          return;
        }
        handleNextClick(1);
      } else if (playback === 3) {
        const index = Math.floor(Math.random() * length);
        handleNextClick(index);
      }
    }
  };

  // 更新时间
  const handleTimeUpdate = useCallback(() => {
    setPosition(audioRef.current!.currentTime);
    dispatch(updateposition(audioRef.current!.currentTime));
  }, []);

  // 是否可以播放
  const oncanplay = () => {
    setLoading(false);
  };

  const play_icon = {
    width: "1.75rem",
    height: "1.75rem",
  };

  const player_icon = {
    width: "2.5rem",
    height: "2.5rem",
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            /* 这里是你的组件 token */
            railBg: "gray",
            railHoverBg: "gray",
            trackHoverBg: "#1ED760",
            dotBorderColor: "#1ED760",
            handleActiveColor: "#1ED760",
            trackBg: "#1ED760",
            dotSize: 4,
          },
        },
      }}
    >
      {Loading ? (
        <Spin
          style={{
            position: "relative",
            top: "0.6rem",
          }}
          indicator={
            <LoadingOutlined style={{ fontSize: 40, color: "#1DD25E" }} spin />
          }
        />
      ) : (
        <>
          <audio
            loop={playback === 0 ? true : false}
            onCanPlay={oncanplay}
            autoPlay={isPlaying}
            onEnded={handleAutoNext}
            ref={audioRef}
            src={music}
            onTimeUpdate={handleTimeUpdate}
            onPlay={() => {
              setIsPlaying(true);
            }}
            onPause={() => {
              setIsPlaying(false);
            }}
          >
            您的浏览器不支持audio元素
          </audio>
          <div className="player">
            <Tooltip title="上一首">
              <BsFillSkipStartFill
                className="play-icon"
                style={play_icon}
                onClick={_.debounce(() => {
                  handleNextClick(-1);
                }, 500)}
              />
            </Tooltip>
            <div onClick={handlePlayPauseClick} className="play-icon">
              {!isPlaying ? (
                <Tooltip title="播放">
                  <AiTwotonePlayCircle style={player_icon} />
                </Tooltip>
              ) : (
                <Tooltip title="暂停">
                  <AiTwotonePauseCircle style={player_icon} />
                </Tooltip>
              )}
            </div>

            <Tooltip title="下一首">
              <BsFillSkipEndFill
                className="play-icon"
                style={play_icon}
                onClick={_.throttle(() => {
                  handleNextClick(1);
                }, 500)}
              />
            </Tooltip>
          </div>
          <div className="slider">
            <span className="time-start">
              {timetampTotime(position * 1000)}
            </span>
            <Slider
              style={{ width: "100%", color: "gray" }}
              min={0}
              value={position}
              max={duration / 1000}
              onChange={(value) => {
                // // 更改
                if (value >= audioRef.current!.duration) {
                  // alert(audioRef.current!.duration + "s后面的没有版权！");
                  message.warning(
                    audioRef.current!.duration + "s后面的没有版权！"
                  );
                  // console.log(audioRef.current!.duration + "s后面的没有版权！");
                } else {
                  setPosition(value);
                  audioRef.current!.currentTime = value;
                }
              }}
            />
            <span className="time-end">
              -{timetampTotime(duration - position * 1000)}
            </span>
          </div>
        </>
      )}
      {/* 更新时间 */}
    </ConfigProvider>
  );
}
