import { createSlice } from "@reduxjs/toolkit";

export interface Timeposition {
    position: number
}

export const initialState: Timeposition = {
    position: 0
}

export const TimepositionSlice = createSlice({
    name: 'timeposition',
    initialState,
    reducers: {
        updateposition: (state, { payload }) => {
            state.position = payload;
        }
    }
});

export const { updateposition } = TimepositionSlice.actions;
export default TimepositionSlice.reducer;