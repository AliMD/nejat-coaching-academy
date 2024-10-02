import {AlwatrJsonFetchStateMachine, type FetchOptions} from 'alwatr/flux';

import {config} from '../../lib/config.js';

export const agentDataSaverJsonFSM = new AlwatrJsonFetchStateMachine({
  name: 'form-data-saver',
  initialState: 'initial',
  fetch: {
    ...config.fetchOptions,
    method: 'PUT',
    url: config.api.agent.save,
  } as FetchOptions
});
