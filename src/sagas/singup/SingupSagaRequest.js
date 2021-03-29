import { takeLatest, call, put, all } from 'redux-saga/effects';
import singupActions, { signupTypes } from '../../redux/signup/SignupRequestRedux';
import loginActions, { loginTypes } from '../../redux/login/LoginRequestRedux';
import { SignupRequest, setAuthorizationBearer } from '../../requests';

function* signup(action) {
  try {
    const response = yield call(SignupRequest, action.data);

    if (response.status >= 200 && response.status < 400) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      setAuthorizationBearer(response.data.token);

      yield put(singupActions.signupSuccess(response.data));
      yield put(loginActions.loginSuccess(response.data));
    } else {
      yield put(singupActions.signupFailure(response.data));
    }
  } catch (e) {
    yield put(singupActions.signupFailure(e && e.response && e.response.data));
    console.log(e);
  }
}

export default function*() {
  yield takeLatest(signupTypes.SIGNUP_REQUEST, signup);
}
