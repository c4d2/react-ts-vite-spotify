import { createSlice } from "@reduxjs/toolkit";

export interface Song {
  picUrl: string;
  songid: string;
  artistid: string;
  songname: string;
  artistname: string;
  albumname: string;
  dt: number;
  fee: string;
}

export interface Songlist {
  list: Array<Song>;
  length: number;
}

export const initialState: Songlist = {
  list: [],
  length: 0,
};

export const SonglistSlice = createSlice({
  name: "songlist",
  initialState,
  reducers: {
    // 增加一个元素
    addsonglist: (state, { payload }) => {
      // 不能重复增加元素
      // 只要有一个元素满足条件则返回 true
      const isRepeat = state.list.some(
        (item) => item.songid === payload.songid
      );
      // 限制一下添加的数量
      if (state.length <= 500 && !isRepeat) {
        state.list.push(payload);
        state.length += 1;
      }
    },
    // 删除一个元素
    deletesonglist: (state, { payload }) => {
      state.list = state.list.filter((item) => item.songid !== payload);
      state.length -= 1;
    },
    // 清空元素
    clearsonglist: (state) => {
      state.list = [];
      state.length = 0;
    },
  },
});

export const { addsonglist, deletesonglist, clearsonglist } =
  SonglistSlice.actions;

export default SonglistSlice.reducer;
