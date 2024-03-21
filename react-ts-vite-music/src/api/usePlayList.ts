import { useQuery } from "react-query";
import Request from "./RequestMusic";
import { AxiosRequestConfig } from "axios";
import { PlayListApiDefinition } from "../domains/playlist";

// 热歌
export const usePlaylisthot = () => {
  const { data, error, isLoading } = useQuery(
    [PlayListApiDefinition.getPlayListHot.url],
    async () => await Request.get(PlayListApiDefinition.getPlayListHot.url)
  );

  return {
    data,
    error,
    isLoading,
  };
};

// 获取专辑
export const usePlaylistDetail = (id) => {
  const album = id.slice(0, 5);
  const payload = album === "album" ? id.substr(5) : id;
  const config: AxiosRequestConfig = {
    params: {
      id: payload,
    },
  };
  const url =
    album === "album"
      ? PlayListApiDefinition.getAlbum.url
      : PlayListApiDefinition.getPlaylistDetail.url;
  const { data, error, isLoading } = useQuery(
    [url],
    async () => await Request.get(url, config)
  );

  return {
    data,
    error,
    isLoading,
  };
};

// 榜单歌曲
export const useTopPlaylist = (cat) => {
  const config: AxiosRequestConfig = {
    params: {
      cat: cat,
      limit: 7,
    },
  };
  const { data, isLoading, error } = useQuery(
    [cat],
    async () =>
      await Request.get(PlayListApiDefinition.getTopPlaylist.url, config)
  );
  return {
    data,
    isLoading,
    error,
  };
};
