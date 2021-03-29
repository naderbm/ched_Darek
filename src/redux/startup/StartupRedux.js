import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  startRequest: [],
});

export const startupTypes = Types;
export default Creators;

export const INITIAL_STATE = {
  started: false,
};

const startRequest = state => ({
  ...state,
  started: true,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.START_REQUEST]: startRequest,
});
