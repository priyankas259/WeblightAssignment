import { createSlice } from "@reduxjs/toolkit";

const ContributorSlice = createSlice({
    name: "Contributor",
    initialState: {
        ContributorData: [],
        ContributorIsLoading: false,
    },
    reducers: {
        ContributorApiRequest: (state, action) => {
            state.ContributorIsLoading = true;
        },
        ContributorApiResponse: (state, action) => {
            state.ContributorData = action.payload;
            state.ContributorIsLoading = false;
        },
        ContributorApiException: (state, action) => {
            state.ContributorIsLoading = false;
        }
    }
});

export const { ContributorApiRequest, ContributorApiResponse, ContributorApiException } = ContributorSlice.actions;
export default ContributorSlice;