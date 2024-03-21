import { createSlice } from "@reduxjs/toolkit";

export interface Volume {
    volume: number
}

const initialState: Volume = {
    volume: 30
}

export const VolumeSlice = createSlice({
    name: 'volume',
    initialState,
    reducers: {
        updateVolume: (state, { payload }) => {
            state.volume = payload;
        }
    }
});

export const { updateVolume } = VolumeSlice.actions;
export default VolumeSlice.reducer;