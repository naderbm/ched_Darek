import { useReducer } from 'react';
import { createReducer, createActions } from 'reduxsauce';
import { pickBy } from 'lodash.pickby';

function useApiState(fn) {
  const INITIAL_STATE = {
    fetching: false,
    error: '',
    data: {},
    success: null,
    errors: [],
  };
  const { Types, Creators } = createActions({
    fetching: ['data'],
    success: ['data'],
    failure: ['error', 'errors'],
  });

  const actions = Creators;
  const fetching = state => ({
    ...state,
    fetching: true,
    success: null,
    error: '',
  });
  const success = (state, { data }) => ({
    ...state,
    data,
    success: true,
    fetching: false,
  });
  const failure = (state, { error, errors }) => ({
    ...state,
    error,
    errors,
    success: false,
    fetching: false,
  });
  const reducer = createReducer(INITIAL_STATE, {
    [Types.FETCHING]: fetching,
    [Types.SUCCESS]: success,
    [Types.FAILURE]: failure,
  });
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  async function call(...params) {
    try {
      const apiParams = params.map(param => {
        if (typeof param === 'object') {
          return pickBy(param, val => val !== undefined);
        }
        return param;
      });

      dispatch(actions.fetching());

      const response = await fn(...apiParams);

      if (
        (response.code >= 200 && response.code < 400 && response.data) ||
        (response.status >= 200 && response.status < 400)
      ) {
        dispatch(actions.success({ data: response.data }));
      } else if (response.code === 401) {
        dispatch(actions.failure({ error: 'UNAUTHORIZED' }));
      } else {
        const errors = {};
        console.log('response', response);

        dispatch(actions.failure({ error: 'Duplicated Suspect', errors: response }));
      }
    } catch (e) {
      //Error not known display check your connection
      dispatch(
        actions.failure({
          error: 'Please check your connection',
        })
      );
    }
  }

  return { ...state, call };
}
function useApi(requests) {
  const calls = {};
  const callsnames = Object.keys(requests);
  const { length } = callsnames;

  for (let i = 0; i < length; i += 1) {
    const key = callsnames[i];
    // eslint-disable-next-line
    calls[key] = useApiState(requests[key]);
  }

  return { ...calls };
}

export default useApi;
