import { createSlice } from "@reduxjs/toolkit";

const AddDeleteSlice = createSlice({
    name: "AddDelete",
    initialState: {
        AddDeleteData: [],
        isLoading: false,
    },
    reducers: {
        AddDeleteApiRequest: (state, action) => {
            state.isLoading = true;
        },
        AddDeleteApiResponse: (state, action) => {
            state.AddDeleteData = action.payload;
            state.isLoading = false;
        },
        AddDeleteException: (state, action) => {
            state.isLoading = false;
        }
    }
});

export const { AddDeleteApiRequest, AddDeleteApiResponse, AddDeleteException } = AddDeleteSlice.actions;
export default AddDeleteSlice;