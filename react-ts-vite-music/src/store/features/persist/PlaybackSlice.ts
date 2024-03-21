import { createSlice } from "@reduxjs/toolkit";

export interface Playback {
    playback: number
}

export const initialState: Playback = {
    playback: 1
}

export const PlaybackSlice = createSlice({
    name: 'playback',
    initialState,
    reducers: {
        updatePlayback: (state, { payload }) => {
            state.playback = payload;
        }
    }
});

export const { updatePlayback } = PlaybackSlice.actions;
export default PlaybackSlice.reducer;