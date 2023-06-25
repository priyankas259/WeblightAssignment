import { call, takeEvery, put } from "redux-saga/effects";
import Axios from "axios";
import { sagaActions } from "./SagaActions";
import { fetchData } from "../Slice/userSlice";
import { CommitActivityApiException, CommitActivityApiResponse } from "../Slice/CommitActivitySlice";
import { AddDeleteApiResponse, AddDeleteException } from "../Slice/AddDeleteSlice";
import { ContributorApiException, ContributorApiResponse } from "../Slice/ContributorSlice";

let callAPI = async ({ url, method, data }) => {
    return await Axios({
        url,
        method,
        data
    });
};

export function* fetchDataSaga(id) {
    try {
        let result = yield call(() =>
            callAPI({ url: `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${id.payload}` })
        );
        const ResponseData = result.data;
        const requiredItemData = ResponseData.items.map(({ owner, name, description, stargazers_count, open_issues_count }) => ({ owner, name, description, stargazers_count, open_issues_count }));
        yield put(fetchData({ ...ResponseData, items: requiredItemData }));
    } catch (e) {
        yield put({ type: "TODO_FETCH_FAILED" });
    }
}

export function* CommitActivitySaga(id) {
    try {
        let result = yield call(() =>
            callAPI({ url: `https://api.github.com/repos/${id?.payload.owner}/${id?.payload.repo}/stats/commit_activity` })
        );
        yield put(CommitActivityApiResponse(result.data));
    } catch (e) {
        yield put(CommitActivityApiException(e));
    }
}

export function* AddDeleteSaga(id) {
    try {
        let result = yield call(() =>
            callAPI({ url: `https://api.github.com/repos/${id?.payload.owner}/${id?.payload.repo}/stats/code_frequency` })
        );
        yield put(AddDeleteApiResponse(result.data));
    } catch (e) {
        yield put(AddDeleteException(e));
    }
}

export function* ContributorSaga(id) {
    try {
        let result = yield call(() =>
            callAPI({ url: `https://api.github.com/repos/${id?.payload.owner}/${id?.payload.repo}/stats/contributors` })
        );
        yield put(ContributorApiResponse(result.data));
    } catch (e) {
        yield put(ContributorApiException(e));
    }
}


export default function* rootSaga() {
    yield takeEvery(sagaActions.FETCH_DATA_SAGA, fetchDataSaga);
    yield takeEvery(sagaActions.FETCH_COMMIT_ACTIVITY, CommitActivitySaga);
    yield takeEvery(sagaActions.FETCH_CODE_FREQ, AddDeleteSaga);
    yield takeEvery(sagaActions.CONTRIBUTOR_REQ, ContributorSaga);
}
