import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  governoratesRequest: ['data'],
  governoratesSuccess: ['response'],
  governoratesFailure: ['error'],
});

export const governoratesTypes = Types;
export default Creators;

export const INITIAL_STATE = {
  fetching: null,
  response: {},
  loaded: null,
  error: null,
};

const governoratesRequest = (state, { data }) => ({
  ...state,
  fetching: true,
  error: null,
  loaded: null,
});

const governoratesSuccess = (state, { response }) => ({
  ...state,
  fetching: false,
  error: false,
  loaded: true,
  response,
});

const governoratesFailure = (state, { error }) => ({
  ...state,
  fetching: false,
  error: true,
  loaded: false,
  response: error,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GOVERNORATES_REQUEST]: governoratesRequest,
  [Types.GOVERNORATES_SUCCESS]: governoratesSuccess,
  [Types.GOVERNORATES_FAILURE]: governoratesFailure,
});
