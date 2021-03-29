import { createReducer, createActions } from 'reduxsauce';
import { setAuthorizationBearer } from '../../requests';
/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  signupRequest: ['data'],
  signupSuccess: ['response'],
  signupFailure: ['error'],
});

export const signupTypes = Types;
export default Creators;

export const INITIAL_STATE = {
  fetching: null,
  response: {},
  loaded: null,
  error: null,
  token: null,
};
const signupRequest = (state, { data }) => ({
  ...state,
  fetching: true,
  error: null,
  loaded: null,
});

const signupSuccess = (state, { response }) => ({
  ...state,
  fetching: false,
  error: false,
  loaded: true,
  response,
  token: response.token,
});

const signupFailure = (state, { error }) => ({
  ...state,
  fetching: false,
  error: true,
  loaded: false,
  response: error,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGNUP_REQUEST]: signupRequest,
  [Types.SIGNUP_SUCCESS]: signupSuccess,
  [Types.SIGNUP_FAILURE]: signupFailure,
});
