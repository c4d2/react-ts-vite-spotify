/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, useEffect, useState } from "react";
const CardItem = lazy(() => import("../../../CardItem"));
import "./style.scss";
import { useTopPlaylist } from "../../../../api/usePlayList";

interface CardListProps {
  cat: string;
}

export default function CardList({ cat }: CardListProps) {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const { data, isLoading } = useTopPlaylist(cat);

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
    <div className="CardList">
      <div className="CardList-head">
        <h1>{cat}</h1>
        <span>展示全部</span>
      </div>
      <div className="List">
        {!isLoading &&
          data?.data.playlists.slice(0, viewportWidth / 266).map((item) => {
            return (
              <CardItem
                key={item.id}
                playlistid={item.id}
                url={item.coverImgUrl}
                name={item.name.split("|")[0]}
                description={item.description}
              />
            );
          })}
      </div>
    </div>
  );
}
