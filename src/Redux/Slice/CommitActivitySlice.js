import { createSlice } from "@reduxjs/toolkit";

const CommitActivitySlice = createSlice({
    name: "CommitActivity",
    initialState: {
        CommitActivityData: [],
        isLoading: false,
    },
    reducers: {
        CommitActivityApiRequest: (state, action) => {
            state.isLoading = true;
        },
        CommitActivityApiResponse: (state, action) => {
            state.CommitActivityData = action.payload;
            state.isLoading = false;
        },
        CommitActivityApiException: (state, action) => {
            state.isLoading = false;
        }
    }
});

export const { CommitActivityApiRequest, CommitActivityApiResponse, CommitActivityApiException } = CommitActivitySlice.actions;
export default CommitActivitySlice;