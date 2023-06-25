import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: [],
        userIsLoading: false,
    },
    reducers: {
        reuqestData: (state, action) => {
            state.userIsLoading = true;
            console.log(state, 'state')
        },
        fetchData: (state, action) => {
            state.userData = action.payload;
            state.userIsLoading = false;
        }
    }
});

export const { fetchData, reuqestData } = userSlice.actions;
export default userSlice;