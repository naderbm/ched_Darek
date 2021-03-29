import { takeLatest, call, put } from 'redux-saga/effects';
import generateQrcodeActions, { generateQrcodeTypes } from '../../redux/generateQrcode/GenerateQrcodeRedux';
import { GenerateQrcode, GenerateQrcodeLogged } from '../../requests';

function* GenerateQrcodeSaga(action) {
  try {
    const response = yield call(
      action.data.login ? GenerateQrcodeLogged : GenerateQrcode,
      action.data.formData
    );
    console.log('response', response);
    if (response.code >= 200 && response.code < 400) {
      yield put(generateQrcodeActions.generateQrcodeSuccess(response.data));
    } else {
      yield put(generateQrcodeActions.generateQrcodeFailure(response.data));
    }
  } catch (e) {
    yield put(generateQrcodeActions.generateQrcodeFailure(e && e.response && e.response.data));
    console.log(e);
  }
}

export default function*() {
  yield takeLatest(generateQrcodeTypes.GENERATE_QRCODE_REQUEST, GenerateQrcodeSaga);
}
