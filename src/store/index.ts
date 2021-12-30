import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import reposReducer from "./slices/reposSlice";

const reducer = combineReducers({
    // here we will be adding reducers
    repos: reposReducer
})
const store = configureStore({
    reducer,
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;