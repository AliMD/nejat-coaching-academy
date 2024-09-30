import {AlwatrJsonFetchStateMachine} from '@alwatr/flux';

import {config} from '../lib/config.js';

export const formDataSaverJsonFSM = new AlwatrJsonFetchStateMachine({
  name: 'form-data-saver',
  initialState: 'initial',
  fetch: {
    ...config.fetchOptions,
    method: 'PUT',
  }
});
