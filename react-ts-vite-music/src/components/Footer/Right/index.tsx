import { ConfigProvider, Slider } from "antd";
import { RootState } from "../../../store/store";
import { Tooltip } from "antd";
import { BsFillVolumeDownFill } from "react-icons/bs";
import { BsFillVolumeUpFill } from "react-icons/bs";

import OneCircle from "../../../assets/onecircle.svg";
import ListCircle from "../../../assets/listcircle.svg";
import Order from "../../../assets/order.svg";
import Random from "../../../assets/random.svg";

import { useDispatch, useSelector } from "react-redux";
import { updateVolume } from "../../../store/features/persist/VolumeSlice";
import { updatePlayback } from "../../../store/features/persist/PlaybackSlice";
import { useState } from "react";

interface RightProps {
  playback: number;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
}

export default function Right({ playback, audioRef }: RightProps) {
  const dispatch = useDispatch();
  // 音量
  const [volume, setVolume] = useState(
    useSelector((state: RootState) => state.volume).volume
  );

  const handleChange = (newValue) => {
    const v = typeof newValue == "number" ? newValue : newValue[0];
    setVolume(v);
    audioRef.current!.volume = v / 100;
    // 更新redux中的变量
    dispatch(updateVolume(v));
  };

  const volume_icon = {
    width: "2rem",
    height: "2rem",
    color: "white",
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
      <Tooltip title="播放设置">
        <div
          className="playback"
          onClick={() => {
            dispatch(updatePlayback((playback + 1) % 4));
          }}
        >
          {playback === 0 && <img src={OneCircle} alt="" />}
          {playback === 1 && <img src={ListCircle} alt="" />}
          {playback === 2 && <img src={Order} alt="" />}
          {playback === 3 && <img src={Random} alt="" />}
        </div>
      </Tooltip>
      <div className="volume">
        <BsFillVolumeDownFill style={volume_icon} className="volume-icon" />
        <Tooltip title="音量">
          <Slider className="slider" value={volume} onChange={handleChange} />
        </Tooltip>
        <BsFillVolumeUpFill style={volume_icon} className="volume-icon" />
      </div>
    </ConfigProvider>
  );
}
