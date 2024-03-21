import { combineReducers } from 'redux';
import currentmusicReducer from "./features/persist/CurrentMusicSlice";
import DoubleClickReducer from "./features/temporary/DoubleClickPlaySlice";
import VolumeReducer from './features/persist/VolumeSlice';
import PlaybackReducer from './features/persist/PlaybackSlice';
import SonglistReducer from './features/persist/SonglistSlice';
import TimepositionReducer from './features/temporary/TimepositionSlice';

export const RootReducer = combineReducers({
    currentmusicinfo: currentmusicReducer,
    doubleclickplay: DoubleClickReducer,
    volume: VolumeReducer,
    playback: PlaybackReducer,
    songlist: SonglistReducer,
    timeposition: TimepositionReducer
})