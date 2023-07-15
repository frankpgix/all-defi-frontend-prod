import { useDispatch } from 'react-redux'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

import shareMessageReducer from './share'
import tokensReducer from './tokens'
import investorReducer from './investor'
import fundsReducer from './funds'

const isProduction = import.meta.env.NODE_ENV === 'production'

const persistConfig = {
  key: isProduction ? 'ALLTOKEN-STORE' : 'ALLTOKEN-STORE-TEST',
  storage,
  whitelist: []
}

const store = configureStore({
  devTools: !isProduction,
  reducer: persistReducer(
    persistConfig,
    combineReducers({
      shareMessage: shareMessageReducer,
      tokens: tokensReducer,
      investor: investorReducer,
      funds: fundsReducer
    })
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch()
export const persistor = persistStore(store)

export default store
