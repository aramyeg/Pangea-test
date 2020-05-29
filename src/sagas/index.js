import axios from 'axios';
import { put, takeLatest, all } from 'redux-saga/effects'
import {userSearchActions, t} from '../actions';

const baseUrl = 'https://api.github.com/search/users';

function* loadUserData(action) {
  try {
    const name = action.query.name.trim();
    let page = action.query.page? action.query.page + 1 : 1;
    const response = yield axios.get(`${baseUrl}`,
      {params:
          {
            q:`${name} in:name type:user`,
            page: page,
            per_page: 10,
          }
      });
    yield put(userSearchActions.loadUserDataSuccess(response.data, page - 1))
  }
  catch(error) {
    console.log(error)
    yield put(userSearchActions.loadUserDataFailure(error))
  }
}

function* watchLoadUserData() {
  yield takeLatest(t.LOAD_USER_DATA, loadUserData);
}

function* watchLoadMoreData() {
  yield takeLatest(t.LOAD_MORE_DATA, loadUserData);
}

export default function* rootSaga() {
  yield all([
    watchLoadUserData(),
    watchLoadMoreData(),

  ])
}