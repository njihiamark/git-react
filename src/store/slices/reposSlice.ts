import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import type { AppState } from "../../store";

//define how the state of this slice will look like
export type ReposState = {
    data: (object[] | object),
    username: (null | string),
    pending: boolean,
    error: boolean,
    current_repo: (null | object)
}

//initialize the initial state
const initialState: ReposState = {
    data: [],
    username: localStorage.getItem("username") ? localStorage.getItem("username") : "",
    pending: false,
    error: false,
    current_repo: localStorage.getItem("current_repo") ? JSON.parse(localStorage.getItem('current_repo') as string) : null
}

//function to get the repos from github API
export const getRepos = createAsyncThunk(
    "repos/getRepos",
    async (username: string) => {
        const response = await axios.get(
            `https://api.github.com/users/${username}/repos`
        );

        return response.data
    }
);

//let us define the slice
export const reposSlice = createSlice({
    name: "repos",
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
            localStorage.setItem("username", action.payload);
        },
        showRepo: (state, action: PayloadAction<number>) => {
            const repo_index = (state.data as object[]).findIndex(((obj: any) => obj.id == action.payload));
            state.current_repo = (state.data as object[])[repo_index];
            localStorage.setItem('current_repo', JSON.stringify((state.data as object[])[repo_index]))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRepos.pending, (state) => {
                state.pending = true;
            })
            .addCase(getRepos.fulfilled, (state, { payload }) => {
                // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
                state.pending = false;
                state.data = payload;

            })
            .addCase(getRepos.rejected, (state) => {
                state.pending = false;
                state.error = true;
            });
    },
});

// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
    setUsername,
    showRepo
} = reposSlice.actions;

//this helps us get the repos state anywere in the app
export const selectRepos = (state: AppState) => state.repos;

//we export default the reducers
export default reposSlice.reducer;

