import { takeLatest, call, put, all } from 'redux-saga/effects';
import curfewActions, { curfewTypes } from '../../redux/curfew/GetcurfewRequestRedux';
import { GetCurfew } from '../../requests';

function* GetCurfewSaga() {
  try {
    const response = yield call(GetCurfew);

    if (response.code >= 200 && response.code < 400) {
      yield put(curfewActions.curfewSuccess(response.data));
    } else {
      console.log('res', response);
      yield put(curfewActions.curfewFailure(response.data));
    }
  } catch (e) {
    yield put(curfewActions.curfewFailure(e && e.response && e.response.data));
    console.log(e);
  }
}

export default function*() {
  yield takeLatest(curfewTypes.CURFEW_REQUEST, GetCurfewSaga);
}
