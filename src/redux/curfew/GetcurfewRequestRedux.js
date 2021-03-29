import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  curfewRequest: [],
  curfewSuccess: ['response'],
  curfewFailure: ['error'],
});

export const curfewTypes = Types;
export default Creators;

export const INITIAL_STATE = {
  fetching: null,
  response: {},
  loaded: null,
  error: null,
};

const curfewRequest = state => ({
  ...state,
  fetching: true,
  error: null,
  loaded: null,
});

const curfewSuccess = (state, { response }) => ({
  ...state,
  fetching: false,
  error: false,
  loaded: true,
  response,
});

const curfewFailure = (state, { error }) => ({
  ...state,
  fetching: false,
  error: true,
  loaded: false,
  response: error,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CURFEW_REQUEST]: curfewRequest,
  [Types.CURFEW_SUCCESS]: curfewSuccess,
  [Types.CURFEW_FAILURE]: curfewFailure,
});
