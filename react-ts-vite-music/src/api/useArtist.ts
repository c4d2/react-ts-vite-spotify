import { useQuery } from "react-query";
import Request from "./RequestMusic";
import { ArtistApiDefinition } from "../domains/artist";
import { AxiosRequestConfig } from "axios";

// 歌手专辑
export const useArtistAlbum = (id, limit = 6) => {
  const config: AxiosRequestConfig = {
    params: {
      id,
      limit,
    },
  };
  const { data, isLoading } = useQuery(
    [ArtistApiDefinition.getArtistsAlbum.url, id],
    async () =>
      await Request.get(ArtistApiDefinition.getArtistsAlbum.url, config)
  );
  return {
    data,
    isLoading,
  };
};

// 歌手详情
export const useArtistsDetail = (id) => {
  const config: AxiosRequestConfig = {
    params: {
      id,
    },
  };
  const { data, isLoading } = useQuery(
    [ArtistApiDefinition.getArtistsDetail.url, id],
    async () =>
      await Request.get(ArtistApiDefinition.getArtistsDetail.url, config)
  );
  return {
    data,
    isLoading,
  };
};

// 歌手单曲
export const useArtists = (id) => {
  const config: AxiosRequestConfig = {
    params: {
      id,
    },
  };
  const { data, isLoading } = useQuery(
    [ArtistApiDefinition.getArtists.url, id],
    async () => await Request.get(ArtistApiDefinition.getArtists.url, config)
  );
  return {
    data,
    isLoading,
  };
};

// // 歌手描述
// export const useArtistsDesc = (id) => {};
