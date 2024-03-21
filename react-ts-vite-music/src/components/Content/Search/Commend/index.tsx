import { useCallback, useEffect, useState, lazy } from "react";
import { useNewSong, usePersonalized } from "../../../../api/useSearch";
import Loading from "../../../Loading";

const Song = lazy(() => import("../../../Song"));
const CardItem = lazy(() => import("../../../CardItem"));

export default function Commend() {
  const [focus, setFocus] = useState<string>("");
  const { data: newSong, isLoading: isLoading1 } = useNewSong();
  const { data: personalized, isLoading: isLoading2 } = usePersonalized();
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const handleSetFocus = useCallback((id: string) => {
    setFocus(id);
  }, []);

  // 监视视口大小
  useEffect(() => {
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {!isLoading1 && !isLoading2 ? (
        <div>
          <div className="text">热搜歌曲</div>
          {newSong &&
            newSong.data.result.map((item, index) => {
              return (
                <Song
                  key={item.id}
                  index={index}
                  picUrl={item.picUrl}
                  songid={item.id}
                  artistname={item.song.artists[0].name}
                  artistid={item.song.artists[0].id}
                  songname={item.name}
                  albumname={item.song.album.name}
                  dt={item.song.duration}
                  focus={focus}
                  handleSetFocus={handleSetFocus}
                  trash={false}
                  fee={item.song.fee}
                />
              );
            })}
          <div className="text">推荐歌单</div>
          <div className="commend-list">
            {personalized &&
              personalized.data.result
                .slice(0, viewportWidth / 266)
                .map((item) => {
                  return (
                    <CardItem
                      key={item.id}
                      playlistid={item.id}
                      url={item.picUrl}
                      name={item.name}
                    />
                  );
                })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
