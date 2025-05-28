// just_home/Frontend/vite-project/src/redux/store.js
// Frontend/vite-project/src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer, listingsReducer } from "./state";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// ✅ Combine all reducers before persisting
const rootReducer = combineReducers({
  user: userReducer,
  listings: listingsReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// ✅ Persist the combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// ✅ Use `const` instead of `let` for consistency
export const persistor = persistStore(store);
