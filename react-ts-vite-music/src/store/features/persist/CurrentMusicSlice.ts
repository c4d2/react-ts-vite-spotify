import { createSlice } from "@reduxjs/toolkit";

export interface CurrentMusicinfo {
  songid: string;
  songname: string;
  artistid: string;
  artistname: string;
  picUrl: string;
  duration?: number;
  fee: string;
}

const initialState: CurrentMusicinfo = {
  songid: "",
  songname: "",
  artistid: "",
  artistname: "",
  picUrl: "",
  duration: 0,
  fee: "",
};

export const currentmusicSlice = createSlice({
  name: "currentmusicinfo",
  initialState,
  reducers: {
    // 操作
    updateinfo: (state, { payload }) => {
      state.artistid = payload.artistid;
      state.songid = payload.songid;
      state.songname = payload.songname;
      state.artistname = payload.artistname;
      state.picUrl = payload.picUrl;
      state.duration = payload.duration;
      state.fee = payload.fee;
    },
  },
});

export const { updateinfo } = currentmusicSlice.actions;

export default currentmusicSlice.reducer;
