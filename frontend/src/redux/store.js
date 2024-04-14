// Importe la fonction 'configureStore' et 'combineReducers' depuis le package Redux Toolkit
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Importe les reducers pour chaque slice
import userSlice from "./userSlice";
import roomSlice from "./roomSlice";

// Importe les fonctions et constantes pour la persistance des données
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

// Configuration pour la persistance des données
const persistConfig = {
  key: "root", // Clé pour accéder aux données persistées
  version: 1, // Version de la configuration de persistance
  storage, // Type de stockage utilisé pour les données persistées (localStorage)
};

// Combine les reducers de chaque slice en un seul reducer global
const rootReducer = combineReducers({ user: userSlice, room: roomSlice });

// Applique la configuration de persistance aux reducers combinés
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure le store Redux
export const store = configureStore({
  reducer: persistedReducer, // Utilise le reducer combiné avec persistance
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore certaines actions pour éviter des erreurs de serialisation
      },
    }),
});

// Crée le persistor pour le store Redux
export let persistor = persistStore(store);