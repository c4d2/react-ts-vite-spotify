import { useQuery } from "react-query";
import Request from "./RequestMusic";
import { SearchApiDefinition } from "../domains/search";
import { AxiosRequestConfig } from "axios";

// 获取推荐新音乐
export const useNewSong = (limit = 10) => {
  const config: AxiosRequestConfig = {
    params: {
      limit,
    },
  };
  const { data, isLoading } = useQuery(
    [SearchApiDefinition.getNewSong.url],
    async () => await Request.get(SearchApiDefinition.getNewSong.url, config)
  );
  return {
    data,
    isLoading,
  };
};

// 获取热搜列表(详细)
export const useSearchot = () => {
  const { data, isLoading } = useQuery(
    [SearchApiDefinition.getSearchot.url],
    async () => await Request.get(SearchApiDefinition.getSearchot.url)
  );
  return {
    data,
    isLoading,
  };
};

// 推荐歌单
export const usePersonalized = (limit = 30) => {
  const config: AxiosRequestConfig = {
    params: {
      limit,
    },
  };
  const { data, isLoading } = useQuery(
    [SearchApiDefinition.getPersonalized.url],
    async () =>
      await Request.get(SearchApiDefinition.getPersonalized.url, config)
  );
  return {
    data,
    isLoading,
  };
};

export const useSearchResult = (keywords, limit = 10) => {
  const config: AxiosRequestConfig = {
    params: {
      keywords,
      limit,
    },
  };
  const { data, isLoading } = useQuery(
    [],
    async () => await Request.get(SearchApiDefinition.getSearch.url, config)
  );

  return {
    data,
    isLoading,
  };
};
