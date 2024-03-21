import storage from 'redux-persist/lib/storage'; // 选择存储引擎

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['doubleclickplay', 'timeposition', 'audioref']
};

export default persistConfig;