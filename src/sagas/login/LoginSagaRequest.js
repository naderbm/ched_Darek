import { takeLatest, call, put, all } from 'redux-saga/effects';
import loginActions, { loginTypes } from '../../redux/login/LoginRequestRedux';
import { LoginRequest, setAuthorizationBearer } from '../../requests';

function* login(action) {
  try {
    const response = yield call(LoginRequest, action.data);

    if (response.status >= 200 && response.status < 400) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      setAuthorizationBearer(response.data.token);

      yield put(loginActions.loginSuccess(response.data));
    } else {
      yield put(loginActions.loginFailure(response.data));
    }
  } catch (e) {
    yield put(loginActions.loginFailure(e && e.response && e.response.data));
    console.log(e);
  }
}

export default function*() {
  yield takeLatest(loginTypes.LOGIN_REQUEST, login);
}
