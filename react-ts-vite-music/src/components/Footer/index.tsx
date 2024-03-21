/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Left from "./Left";
import Center from "./Center";
import Right from "./Right";
import { RootState } from "../../store/store";
import * as _ from "lodash";
import "./style.scss";

export const Footer: React.FC = () => {
  // 从redux状态管理 里面取
  const { songid, songname, artistid, artistname, picUrl, duration, fee } =
    useSelector((state: RootState) => state.currentmusicinfo);

  const { playback } = useSelector((state: RootState) => state.playback);

  // 控制audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  return (
    <div className="Footer">
      <Left
        picUrl={picUrl}
        songid={songid}
        artistid={artistid}
        songname={songname}
        artistname={artistname}
        fee={fee}
      />
      <div className="center">
        <Center
          playback={playback}
          songid={songid}
          audioRef={audioRef}
          duration={duration || 0}
        />
      </div>
      <div className="right">
        <Right audioRef={audioRef} playback={playback} />
      </div>
    </div>
  );
};
