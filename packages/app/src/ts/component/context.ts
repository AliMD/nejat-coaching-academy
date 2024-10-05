import {AlwatrJsonFetchStateMachine, type FetchOptions} from 'alwatr/flux';

import {config} from '../lib/config.js';

export const formDataSaverJsonFSM = new AlwatrJsonFetchStateMachine({
  name: 'form-data-saver',
  initialState: 'initial',
  fetch: {
    ...config.fetchOptions,
    method: 'PUT',
  } as FetchOptions
});

export const agentDataSaverJsonFSM = new AlwatrJsonFetchStateMachine({
  name: 'form-data-saver',
  initialState: 'initial',
  fetch: {
    ...config.fetchOptions,
    method: 'PUT',
    url: config.api.adminAgent.save,
  } as FetchOptions
});

export const fileUploaderJsonFSM = new AlwatrJsonFetchStateMachine<{ ok: boolean; data: { fileId: string | number } }>({
  name: 'file-uploader',
  initialState: 'initial',
  fetch: {
    ...config.fetchOptions,
    method: 'POST',
    url: config.api.file.upload,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  } as FetchOptions
});
