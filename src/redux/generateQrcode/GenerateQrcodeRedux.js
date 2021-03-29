import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  generateQrcodeRequest: ['data', 'login'],
  generateQrcodeSuccess: ['response'],
  generateQrcodeFailure: ['error'],
});

export const generateQrcodeTypes = Types;
export default Creators;

export const INITIAL_STATE = {
  fetching: null,
  response: {},
  loaded: null,
  error: null,
};

const generateQrcodeRequest = (state, { formData, login }) => ({
  ...state,
  fetching: true,
  error: null,
  loaded: null,
});

const generateQrcodeSuccess = (state, { response }) => ({
  ...state,
  fetching: false,
  error: false,
  loaded: true,
  response,
});

const generateQrcodeFailure = (state, { error }) => ({
  ...state,
  fetching: false,
  error: true,
  loaded: false,
  response: error,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GENERATE_QRCODE_REQUEST]: generateQrcodeRequest,
  [Types.GENERATE_QRCODE_SUCCESS]: generateQrcodeSuccess,
  [Types.GENERATE_QRCODE_FAILURE]: generateQrcodeFailure,
});
