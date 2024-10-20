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

export const fileUploaderJsonFSM = new AlwatrJsonFetchStateMachine<UploadResult>({
  name: 'file-uploader',
  initialState: 'initial',
  fetch: {
    ...config.fetchOptions,
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  } as FetchOptions
});
