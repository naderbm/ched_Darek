import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  changeSteper: ['current'],
});

export const steperTypes = Types;
export default Creators;

export const INITIAL_STATE = {
  current: 0,
};

const changeSteper = (state, { current }) => ({
  ...state,
  current,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_STEPER]: changeSteper,
});
