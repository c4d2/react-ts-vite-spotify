import { createSlice } from "@reduxjs/toolkit";
import React from "react";

export interface AudioRef {
    audioRef: React.MutableRefObject<HTMLAudioElement | null>,
}

const initialState: AudioRef = {
    audioRef: { current: null }
}

const AudioRefSlice = createSlice({
    name: 'audioref',
    initialState,
    reducers: {
        updateAudioRef: (state, { payload }) => {
            state.audioRef = payload;
        }
    }
})

export const { updateAudioRef } = AudioRefSlice.actions;

export default AudioRefSlice.reducer