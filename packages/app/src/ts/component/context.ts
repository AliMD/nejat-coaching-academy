import {AlwatrJsonFetchStateMachine, type FetchOptions} from 'alwatr/flux';

import {config} from '../lib/config.js';

export const formDataSaverJsonFSM = new AlwatrJsonFetchStateMachine<AcademyUserDataAfterSave>({
  name: 'form-data-saver',
  initialState: 'initial',
  fetch: {
    ...config.fetchOptions,
    method: 'PUT',
  } as FetchOptions
});
