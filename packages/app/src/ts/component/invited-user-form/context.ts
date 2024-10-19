import {AlwatrJsonFetchStateMachine, type FetchOptions} from 'alwatr/flux';

import {config} from '../../lib/config.js';

export const getInvitingUserDataJsonFSM = new AlwatrJsonFetchStateMachine<AcademyUser>({
  name: 'inviting-user-data-fetcher',
  initialState: 'initial',
  fetch: {
    ...config.fetchOptions,
    method: 'GET',
  } as FetchOptions
});
