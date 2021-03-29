import { takeLatest, call, put, all } from 'redux-saga/effects';
import startupActions, { startupTypes } from '../../redux/startup/StartupRedux';

function* startup(action) {
  console.log('Saga started', action.type);
}

export default function*() {
  yield takeLatest(startupActions.START_REQUEST, startup);
}
