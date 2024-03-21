import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPlay } from "react-icons/fa";
import "./style.scss";
import { updateinfo } from "../../store/features/persist/CurrentMusicSlice";
import { updateStatus } from "../../store/features/temporary/DoubleClickPlaySlice";
import { addsonglist } from "../../store/features/persist/SonglistSlice";
import { deletesonglist } from "../../store/features/persist/SonglistSlice";
import { timetampTotime } from "../../global/timestampTotime";
import { RootState } from "../../store/store";
import { BiSolidTrash } from "react-icons/bi";
import { IoAddCircleOutline } from "react-icons/io5";
import { Tooltip, message } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface SongProps {
  index: number;
  picUrl: string;
  songid: string;
  artistid: string;
  songname: string;
  artistname: string;
  albumname: string;
  trash: boolean;
  dt: number;
  focus: string;
  fee: string;
  handleSetFocus: (id: string) => void;
}

export default function Song({
  index,
  picUrl,
  songid,
  artistid,
  songname,
  artistname,
  albumname,
  dt,
  focus,
  fee,
  handleSetFocus,
  trash = false,
}: SongProps) {
  const { length } = useSelector((state: RootState) => state.songlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  // 双击播放歌曲
  const handleDoubleclick = () => {
    dispatch(
      updateinfo({
        picUrl,
        songid,
        artistid,
        songname,
        artistname,
        duration: dt,
        fee,
      })
    );
    dispatch(updateStatus(songid));
    addSong();
  };

  // 添加歌曲到歌单
  const addSong = () => {
    if (length <= 500) {
      dispatch(
        addsonglist({
          picUrl,
          songid,
          artistid,
          songname,
          artistname,
          albumname,
          dt,
          fee,
        })
      );
    } else {
      alert("list容量上限500");
    }
  };

  const handleClickDelete = useCallback(() => {
    // 删除
    dispatch(deletesonglist(songid));
  }, [songid]);

  return (
    <div
      onClick={() => {
        handleSetFocus(songid);
      }}
      // 当鼠标移入
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      // 当鼠标移出
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onDoubleClick={handleDoubleclick}
      className={"Song" + (focus === songid ? " active" : "")}
    >
      <div className="number">
        {isHovered || focus === songid ? (
          <>
            <Tooltip title="播放">
              <FaPlay onClick={handleDoubleclick} className="play-icon" />
            </Tooltip>
            <Tooltip title="添加到歌单">
              <IoAddCircleOutline
                onClick={() => {
                  addSong();
                  message.success("添加成功！");
                }}
                className="add-music"
              />
            </Tooltip>
          </>
        ) : (
          <span>{index + 1}</span>
        )}
      </div>
      {Number(fee) % 2 ? (
        <div className="vip">
          <span>vip</span>
        </div>
      ) : (
        <div />
      )}
      <div className="title">
        <LazyLoadImage src={picUrl} />
        <div className="title-text">
          <span
            onClick={() => {
              navigate(`/song/${songid}`);
            }}
          >
            {songname}
          </span>
          <div
            onClick={() => {
              navigate(`/artists/${artistid}`);
            }}
          >
            {artistname}
          </div>
        </div>
      </div>
      <div className="album">{albumname}</div>
      <div className="time">
        {typeof dt === "number" ? timetampTotime(dt) : dt}
      </div>
      {trash ? (
        <div className="icon" onClick={handleClickDelete}>
          <BiSolidTrash />
        </div>
      ) : null}
    </div>
  );
}
