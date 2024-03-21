import { lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import DetailHead from "../../DetailHead";
import PlayPauseButton from "../../PlayPauseButton";
const Comendlist = lazy(() => import("./Comendlist/Comendlist"));
const SimilarAlbum = lazy(() => import("./SimilarAlbum/SimilarAlbum"));
const Lyric = lazy(() => import("./Lyric/Lyric"));
import { useSongDetail, useSimiPlaylist } from "../../../api/useSong";
import "./style.scss";
import Loading from "../../Loading";
import { Empty } from "antd";

export default function SongDetail() {
  const { id } = useParams();
  const { data: songinfo, isLoading: isLoading1 } = useSongDetail(id);
  const { data: simiplaylist, isLoading: isLoading2 } = useSimiPlaylist(id);
  return songinfo ? (
    <div className="SongDetail">
      {!isLoading1 && (
        <DetailHead
          image={songinfo.data.songs[0].al.picUrl}
          name={songinfo.data.songs[0].al.name}
          updatetime={songinfo.data.songs[0].ar[0].name}
          description={songinfo.data.songs[0].name}
        />
      )}
      <div className="detail">
        <PlayPauseButton list={songinfo.data.songs} />
        <Suspense fallback={<Loading />}>
          <Lyric songid={id} />
          <div className="text">推荐歌曲</div>
          <Comendlist songid={id} />
          <div className="text">相似专辑</div>
          {!isLoading2 && simiplaylist?.data.playlists.length ? (
            <SimilarAlbum list={simiplaylist?.data.playlists} />
          ) : (
            <Empty className="empty" description={"快去选首歌加入你的歌单吧"} />
          )}
        </Suspense>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
