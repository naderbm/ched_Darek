import { createReducer, createActions } from 'reduxsauce';
import { setAuthorizationBearer } from '../../requests';
/* -------------------- Types and Actions Creators ----------------*/

const { Types, Creators } = createActions({
  loginRequest: ['data'],
  loginSuccess: ['response'],
  loginFailure: ['error'],
  logout: ['token'],
});

export const loginTypes = Types;
export default Creators;

export const INITIAL_STATE = {
  fetching: null,
  response: {},
  loaded: null,
  error: null,
  token: null,
};
const loginRequest = (state, { data }) => ({
  ...state,
  fetching: true,
  error: null,
  loaded: null,
});

const loginSuccess = (state, { response }) => ({
  ...state,
  fetching: false,
  error: false,
  loaded: true,
  response,
  token: response.token,
});

const loginFailure = (state, { error }) => ({
  ...state,
  fetching: false,
  error: true,
  loaded: false,
  response: error,
});

const logout = (state = INITIAL_STATE) => {
  setAuthorizationBearer(null);
  localStorage.removeItem('token');
  return {
    ...state,
    token: null,
    connected: false,
    error: null,
    response: {},
    loaded: false,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.LOGOUT]: logout,
});
