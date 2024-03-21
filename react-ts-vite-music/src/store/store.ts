import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import persistConfig from "./persistConifg";
import { RootReducer } from "./reducer";

const PersistReducer = persistReducer(persistConfig, RootReducer);

// 创建一个Store来管理数据
const store = configureStore({
    reducer: PersistReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // 忽略非序列化的 action，以便与 redux-persist 兼容
        }),
});

const persistor = persistStore(store);

export { persistor, store };

// 根类型  从存储本身推断“根状态”和“AppDispatch”类型
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch