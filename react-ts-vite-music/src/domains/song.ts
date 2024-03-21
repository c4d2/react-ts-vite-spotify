export const SongApiDefinition = {
  getSongUrl: {
    method: "get" as const,
    url: "/song/url",
  },
  getSongDetail: {
    method: "get" as const,
    url: "/song/detail",
  },
  getLyric: {
    method: "get" as const,
    url: "/lyric",
  },
  getSimiSong: {
    method: "get" as const,
    url: "/simi/song",
  },
  getSimiPlaylist: {
    method: "get" as const,
    url: "/simi/playlist",
  },
};
