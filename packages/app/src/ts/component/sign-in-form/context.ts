import {AlwatrJsonFetchStateMachine, type FetchOptions} from 'alwatr/flux';

import {config} from '../../lib/config.js';

export const getEntityFSM = new AlwatrJsonFetchStateMachine({
  name: 'get-entity',
  initialState: 'initial',
  fetch: {
    ...config.fetchOptions,
    method: 'GET',
  } as FetchOptions
});

export const signUpUserFSM = new AlwatrJsonFetchStateMachine<AuthData>({
  name: 'sing-up-user',
  initialState: 'initial',
  fetch: {
    ...config.fetchOptions,
    method: 'POST',
  } as FetchOptions
});
