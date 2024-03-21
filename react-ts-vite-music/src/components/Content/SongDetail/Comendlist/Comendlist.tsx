/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { useSimiSong } from "../../../../api/useSong";
import Song from "../../../Song";

interface ComendlistProps {
  songid: string | undefined;
}

export default function Comendlist({ songid }: ComendlistProps) {
  const [focus, setFocus] = useState<string>("");
  const { data, isLoading } = useSimiSong(songid);
  const handleSetFocus = useCallback((id: string) => {
    setFocus(id);
  }, []);
  return (
    <>
      <div className="list">
        {!isLoading &&
          data?.data.songs.map((item, index) => {
            return (
              <Song
                key={item.artists[0].id}
                index={index}
                picUrl={item.album.picUrl}
                songid={item.id}
                artistid={item.artists[0].id}
                songname={item.name}
                artistname={item.artists[0].name}
                albumname={item.name}
                dt={item.duration}
                focus={focus}
                handleSetFocus={handleSetFocus}
                trash={false}
                fee={item.fee}
              />
            );
          })}
      </div>
    </>
  );
}
