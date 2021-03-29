import { fork, all } from 'redux-saga/effects';
import startup from './startup/startupSagas';
import login from './login/LoginSagaRequest';
import governorates from './governorates/GovernoratesRequestSaga';
import exitreasons from './exitreasons/ExitreasonsRequestSaga';
import signup from './singup/SingupSagaRequest';
import generateQrcode from './generateQrcode/GenerateQrcodeSaga';
import curfew from './curfew/GetcurfewSaga';

const sagas = [startup, login, governorates, exitreasons, signup, generateQrcode, curfew];

function* rootSaga() {
  const globalSagasForks = sagas.map(saga => fork(saga));
  yield all([...globalSagasForks]);
}
export default rootSaga;
