/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, useState, useCallback } from "react";
const Song = lazy(() => import("../Song"));
import "./style.scss";

interface SongListProps {
  list: Array<any>;
  trash?: boolean;
}

export default function SongList({ list, trash = false }: SongListProps) {
  const [focus, setFocus] = useState<string>("");
  const handleSetFocus = useCallback((id: string) => {
    setFocus(id);
  }, []);
  return (
    <div className="SongList">
      {list &&
        list.map((item, index) => {
          return (
            <Song
              trash={trash}
              key={item.id || item.songid}
              index={index}
              picUrl={(item.id && item.al?.picUrl) || item.picUrl}
              songid={item.id || item.songid}
              artistid={(item.id && item.ar[0].id) || item.artistid}
              songname={(item.id && item.name) || item.songname}
              artistname={(item.id && item.ar[0].name) || item.artistname}
              albumname={(item.id && item.al.name) || item.albumname}
              dt={item.dt}
              handleSetFocus={handleSetFocus}
              focus={focus}
              fee={item.fee}
            />
          );
        })}
    </div>
  );
}
