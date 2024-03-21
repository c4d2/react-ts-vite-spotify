import { useQuery } from "react-query";
import Request from "./RequestMusic";
import { SongApiDefinition } from "../domains/song";
import { AxiosRequestConfig } from "axios";

// 获取音乐的url
export const useSongurl = (id) => {
  const config: AxiosRequestConfig = {
    params: {
      id,
    },
  };
  const { data, isLoading } = useQuery(
    // 如果键值对相同的话，则会直接去出缓存中的取数据而不会发起请求
    [SongApiDefinition.getSongUrl.url, id],
    async () => await Request.get(SongApiDefinition.getSongUrl.url, config)
  );

  return {
    url: data,
    isLoading,
  };
};

// 获取音乐详情
export const useSongDetail = (id) => {
  const config: AxiosRequestConfig = {
    params: {
      ids: id,
    },
  };
  const { data, isLoading } = useQuery(
    [SongApiDefinition.getSongDetail.url, id],
    async () => await Request.get(SongApiDefinition.getSongDetail.url, config)
  );
  return {
    data,
    isLoading,
  };
};

// 获取音乐歌词
export const useLyric = (id) => {
  const config: AxiosRequestConfig = {
    params: {
      id,
    },
  };
  const { data, isLoading } = useQuery(
    [SongApiDefinition.getLyric.url, id],
    async () => await Request.get(SongApiDefinition.getLyric.url, config)
  );

  return {
    data,
    isLoading,
  };
};

// 获取相似歌曲
export const useSimiSong = (id) => {
  const config: AxiosRequestConfig = {
    params: {
      id,
    },
  };
  const { data, isLoading } = useQuery(
    [SongApiDefinition.getSimiSong.url, id],
    async () => await Request.get(SongApiDefinition.getSimiSong.url, config)
  );
  return {
    data,
    isLoading,
  };
};

// 获取与歌曲相似的专辑
export const useSimiPlaylist = (id) => {
  const config: AxiosRequestConfig = {
    params: {
      id,
    },
  };
  const { data, isLoading } = useQuery(
    [SongApiDefinition.getSimiPlaylist.url, id],
    async () => await Request.get(SongApiDefinition.getSimiPlaylist.url, config)
  );
  return {
    data,
    isLoading,
  };
};
