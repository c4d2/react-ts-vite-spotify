import { lazy } from "react";
import "./style.scss";
import PlayPauseButton from "../../PlayPauseButton";
import SongList from "../../SongList";
import { useParams } from "react-router-dom";
import { usePlaylistDetail } from "../../../api/usePlayList";
const DetailHead = lazy(() => import("../../DetailHead"));

export default function PlaylistDetail() {
  const { id } = useParams();
  const album = id?.slice(0, 5);
  const { data, isLoading } = usePlaylistDetail(id);

  return (
    <div className="PlaylistDetail">
      {isLoading ? null : (
        <>
          <DetailHead
            image={
              album === "album"
                ? data?.data.album.blurPicUrl
                : data?.data["playlist"]["coverImgUrl"]
            }
            name={
              album === "album"
                ? data?.data.album.name
                : data?.data["playlist"]["name"]
            }
            updatetime={
              album === "album"
                ? data?.data.album.subType
                : data?.data["playlist"]["updateFrequency"]
            }
            description={
              album === "album"
                ? data?.data.album.description
                : data?.data["playlist"]["description"]
            }
          />
          <div className="songtable">
            <PlayPauseButton
              list={
                album === "album"
                  ? data?.data.songs
                  : data?.data.playlist.tracks
              }
            />
            <div className="head-style">
              <div>#</div>
              <div>标题</div>
              <div>专辑</div>
              <div>时长</div>
            </div>
            <div className="songlist">
              <SongList
                list={
                  album === "album"
                    ? data?.data.songs
                    : data?.data.playlist.tracks
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
