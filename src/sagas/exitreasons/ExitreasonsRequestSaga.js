import { takeLatest, call, put, all } from 'redux-saga/effects';
import exitreasonsActions, { exitreasonsTypes } from '../../redux/exitreasons/ExitreasonsRequestRedux';
import { GetExitreasons } from '../../requests';

function* GetExitreason(action) {
  try {
    const response = yield call(GetExitreasons);

    if (response.status >= 200 && response.status < 400) {
      yield put(exitreasonsActions.exitreasonsSuccess(response.data));
    } else {
      yield put(exitreasonsActions.exitreasonsFailure(response.data));
    }
  } catch (e) {
    yield put(exitreasonsActions.exitreasonsFailure(e && e.response && e.response.data));
    console.log(e);
  }
}

export default function*() {
  yield takeLatest(exitreasonsTypes.EXITREASONS_REQUEST, GetExitreason);
}
