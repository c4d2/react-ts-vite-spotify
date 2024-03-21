/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, lazy, useCallback } from "react";
import { useArtistAlbum, useArtists } from "../../../api/useArtist";
import DetailHead from "../../DetailHead";
import { useParams } from "react-router-dom";
import PlayPauseButton from "../../PlayPauseButton";
const Song = lazy(() => import("../../Song"));
const SimilarAlbum = lazy(
  () => import("../SongDetail/SimilarAlbum/SimilarAlbum")
);
import "./style.scss";

export default function ArtistsDetail() {
  const { id } = useParams();
  const { data: artists, isLoading: isLoading1 } = useArtists(id);
  const { data: artistalbum, isLoading: isLoading2 } = useArtistAlbum(id);

  const [focus, setFocus] = useState<string>("");
  const handleSetFocus = useCallback((id: string) => {
    setFocus(id);
  }, []);

  return (
    <>
      {!isLoading1 && (
        <DetailHead
          image={artists?.data.artist.img1v1Url}
          name={artists?.data.artist.name}
          description={artists?.data.artist.briefDesc}
        />
      )}
      <PlayPauseButton list={artists?.data.hotSongs.slice(0, 10)} />
      <div className="detail">
        <div className="text">热门</div>
        {artists?.data.hotSongs.slice(0, 10).map((item, index) => {
          return (
            <Song
              key={item.id}
              index={index}
              picUrl={item.al.picUrl}
              songid={item.id}
              artistid={item.ar[0].id}
              songname={item.name}
              artistname={item.ar[0].name}
              albumname={item.name}
              dt={item.dt}
              focus={focus}
              handleSetFocus={handleSetFocus}
              trash={false}
              fee={item.fee}
            />
          );
        })}
        <div className="text">相似专辑</div>
        <div className="similar-album">
          {!isLoading2 && (
            <SimilarAlbum album="album" list={artistalbum?.data.hotAlbums} />
          )}
        </div>
      </div>
    </>
  );
}
