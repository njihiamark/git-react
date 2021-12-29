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
    data: localStorage.getItem("data") ? JSON.parse(localStorage.getItem('data') as string):[],
    username: localStorage.getItem("username") ? localStorage.getItem("username") : "",
    pending: false,
    error: false,
    current_repo: localStorage.getItem("current_repo") ? JSON.parse(localStorage.getItem('current_repo') as string) :null
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

//function to get the repo readme from github API
export const getRepoReadme = createAsyncThunk(
    "repos/getRepoReadme",
    async (nameObject:{username: string, reponame: string}) => {
        const {username, reponame} = nameObject;
        const response = await axios.get(
            `https://api.github.com/repos/${username}/${reponame}/contents/README.md`
        );

        response.data.repo_name = reponame; 
        return response.data;
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
        resetData: (state) => {
            state.data = [];
            localStorage.setItem('data', JSON.stringify([]));
        },
        resetError: (state) => {
            state.error = false;
        },
        resetReadMeRepo: (state) => {
            state.current_repo = [];
            localStorage.setItem('current_repo', JSON.stringify({}));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRepos.pending, (state) => {
                state.pending = true;
                state.error = false;
            })
            .addCase(getRepos.fulfilled, (state, { payload }) => {
                // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
                state.pending = false;
                state.error = false;
                state.data = payload;
                localStorage.setItem('data', JSON.stringify(payload));
            })
            .addCase(getRepos.rejected, (state) => {
                state.pending = false;
                state.error = true;
                state.data = [];
                localStorage.setItem('data', JSON.stringify([]));
            })
            .addCase(getRepoReadme.pending, (state) => {
                state.pending = true;
                state.error = false;
            })
            .addCase(getRepoReadme.fulfilled, (state, { payload }) => {
                // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
                state.pending = false;
                state.error = false;
                state.current_repo = payload;
                localStorage.setItem('current_repo', JSON.stringify(payload));
            })
            .addCase(getRepoReadme.rejected, (state) => {
                state.pending = false;
                state.error = true;
                state.current_repo = {};
                localStorage.setItem('current_repo', JSON.stringify({}));
            });
    },
});

// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const {
    setUsername,
    resetData,
    resetReadMeRepo,
    resetError
} = reposSlice.actions;

//this helps us get the repos state anywere in the app
export const selectRepos = (state: AppState) => state.repos;

//we export default the reducers
export default reposSlice.reducer;

