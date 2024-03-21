import { MdPlayCircleFilled } from "react-icons/md";
import { updateinfo } from "../../store/features/persist/CurrentMusicSlice";
import { updateStatus } from "../../store/features/temporary/DoubleClickPlaySlice";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { addsonglist } from "../../store/features/persist/SonglistSlice";
import { RootState } from "../../store/store";

interface PlayPauseButtonProps {
  list: any;
}

export default function   PlayPauseButton({ list = [] }: PlayPauseButtonProps) {
  const dispatch = useDispatch();
  const { length } = useSelector((state: RootState) => state.songlist);

  // 点击播放
  const handleClick = () => {
    dispatch(
      updateinfo({
        picUrl: list[0].al.picUrl,
        songid: list[0].id,
        artistid: list[0].ar[0].id,
        songname: list[0].name,
        artistname: list[0].ar[0].name,
        duration: list[0].dt,
      })
    );
    dispatch(updateStatus(list[0].id));
    addSong();
  };

  // 添加歌曲到歌单
  const addSong = () => {
    if (list.length) {
      list.forEach((element, index) => {
        if (length + index <= 500) {
          dispatch(
            addsonglist({
              picUrl: element.al.picUrl,
              songid: element.id,
              artistid: element.ar[0].id,
              songname: element.name,
              artistname: element.ar[0].name,
              albumname: element.al.name,
              dt: element.dt,
            })
          );
        } else {
          alert("已达上限500首");
          return;
        }
      });
    }
  };

  return (
    <div className="PlayPauseButton">
      <MdPlayCircleFilled onClick={handleClick} className="pause" />
    </div>
  );
}
