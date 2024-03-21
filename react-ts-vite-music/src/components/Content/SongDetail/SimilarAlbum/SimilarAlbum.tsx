/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import CardItem from "../../../CardItem";

interface SimilarAlbumProps {
  album?: string;
  list: any;
}

export default function SimilarAlbum({ list, album = "" }: SimilarAlbumProps) {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

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
      <div className="playlist">
        {list.slice(0, viewportWidth / 266).map((item) => {
          return (
            <CardItem
              key={item.id}
              playlistid={album + item.id}
              url={item.coverImgUrl || item.picUrl}
              name={item.name.split("|")[0]}
              description={item.description}
            />
          );
        })}
      </div>
    </>
  );
}
