import { legacy_createStore as createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/index';
const persisConfig = {
  key: 'auth',
  storage,
};

const persistedStore = persistReducer(persisConfig, rootReducer);
const store = createStore(persistedStore);
const Persistor = persistStore(store);

export default store;

export { Persistor };
