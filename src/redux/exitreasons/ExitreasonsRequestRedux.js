import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  exitreasonsRequest: ['data'],
  exitreasonsSuccess: ['response'],
  exitreasonsFailure: ['error'],
});

export const exitreasonsTypes = Types;
export default Creators;

export const INITIAL_STATE = {
  fetching: null,
  response: {},
  loaded: null,
  error: null,
};

const exitreasonsRequest = (state, { data }) => ({
  ...state,
  fetching: true,
  error: null,
  loaded: null,
});

const exitreasonsSuccess = (state, { response }) => ({
  ...state,
  fetching: false,
  error: false,
  loaded: true,
  response,
});

const exitreasonsFailure = (state, { error }) => ({
  ...state,
  fetching: false,
  error: true,
  loaded: false,
  response: error,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.EXITREASONS_REQUEST]: exitreasonsRequest,
  [Types.EXITREASONS_SUCCESS]: exitreasonsSuccess,
  [Types.EXITREASONS_FAILURE]: exitreasonsFailure,
});
