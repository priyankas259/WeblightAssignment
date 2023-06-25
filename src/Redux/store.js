import {
  createSlice,
  configureStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "./Saga/Saga";
import userSlice from "./Slice/userSlice"
import CommitActivitySlice from "./Slice/CommitActivitySlice";
import AddDeleteSlice from "./Slice/AddDeleteSlice";
import ContributorSlice from "./Slice/ContributorSlice";

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    CommitActivity: CommitActivitySlice.reducer,
    AddDelete: AddDeleteSlice.reducer,
    Contributor: ContributorSlice.reducer,
  },
  middleware
});

sagaMiddleware.run(saga);

export default store;
