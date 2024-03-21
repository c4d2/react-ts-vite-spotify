/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useLyric } from "../../../../api/useSong";
interface LyricProps {
  songid: string | undefined;
}

function stringTotime(time: string) {
  const alltime = time.split(":");
  const munites = parseInt(alltime[0]);
  const second = parseFloat(alltime[1]);
  return munites * 60 + second;
}

export default function Lyric({ songid }: LyricProps) {
  const [ly, setLy] = useState<Array<[string, string]>>([]);
  const { data, isLoading } = useLyric(songid);
  const { position } = useSelector((state: RootState) => state.timeposition);
  const [index, setIndex] = useState(0);
  const id = useSelector((state: RootState) => state.currentmusicinfo.songid);
  // 获取音乐控制器
  useEffect(() => {
    if (!isLoading) {
      const text = data?.data.lrc.lyric;
      const temp = text.split("\n");
      const lyriclist = temp.map((item: any) => {
        return item.slice(1).split("]");
      });
      setLy(lyriclist);
    }
  }, [data, isLoading, songid]);

  useEffect(() => {
    const element = document.getElementById("active-lyric");
    setIndex(ly.findIndex((item) => item[1] === element?.textContent));
  }, [position]);

  useEffect(() => {
    const lyricsElement = document.getElementById("Lyric");
    const element = document.getElementById("active-lyric");
    if (element && lyricsElement) {
      const containerRect = lyricsElement.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const offset =
        elementRect.top -
        containerRect.top -
        containerRect.height / 2 +
        elementRect.height / 2;
      lyricsElement.scrollTo({
        top: lyricsElement.scrollTop + offset,
        behavior: "smooth",
      });
    }
  }, [index]);

  return (
    <div id="Lyric">
      {!isLoading &&
        ly &&
        ly.map((item, index, list) => {
          return (
            <div
              key={index}
              id={
                String(id) === songid &&
                index != 0 &&
                position > stringTotime(item[0]) &&
                position < stringTotime(list[index + 1][0])
                  ? "active-lyric"
                  : index === list.length - 1
                  ? ""
                  : "lyric"
              }
            >
              {item[1]}
            </div>
          );
        })}
    </div>
  );
}
