import {AlwatrJsonFetchStateMachine, type FetchOptions} from 'alwatr/flux';

import {config} from '../../lib/config.js';

export const getUserDataJsonFSM = new AlwatrJsonFetchStateMachine<AcademyUserDataAfterSave>({
  name: 'user-data-fetcher',
  initialState: 'initial',
  fetch: {
    ...config.fetchOptions,
    method: 'GET',
  } as FetchOptions
});
