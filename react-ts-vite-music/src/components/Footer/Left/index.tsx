import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentMusicinfo } from "../../../store/features/persist/CurrentMusicSlice";
import { Image, Tooltip } from "antd";

export default function Left({
  picUrl,
  songid,
  artistid,
  songname,
  artistname
}: CurrentMusicinfo) {
  useEffect(() => {}, [picUrl]);
  const navigate = useNavigate();
  return (
    <>
      <div className="left">
        <div className="img">
          <Tooltip title="查看图片">
            <Image src={picUrl} alt="" />
          </Tooltip>
        </div>
        <div className="left-text">
          <span
            onClick={() => {
              navigate(`/song/${songid}`);
            }}
          >
            {songname}
          </span>
          <div
            className="artist"
            onClick={() => {
              navigate(`/artists/${artistid}`);
            }}
          >
            {artistname}
          </div>
        </div>
      </div>
    </>
  );
}
