import { takeLatest, call, put, all } from 'redux-saga/effects';
import governoratesActions, { governoratesTypes } from '../../redux/governorates/GovernoratesRequestRedux';
import { GetGovernorates } from '../../requests';

function* GetGovs(action) {
  try {
    const response = yield call(GetGovernorates);

    if (response.status >= 200 && response.status < 400) {
      yield put(governoratesActions.governoratesSuccess(response.data));
    } else {
      yield put(governoratesActions.governoratesFailure(response.data));
    }
  } catch (e) {
    yield put(governoratesActions.governoratesFailure(e && e.response && e.response.data));
    console.log(e);
  }
}

export default function*() {
  yield takeLatest(governoratesTypes.GOVERNORATES_REQUEST, GetGovs);
}
