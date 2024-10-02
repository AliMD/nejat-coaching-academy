import {AlwatrJsonFetchStateMachine, type FetchOptions} from 'alwatr/flux';

import {config} from '../../lib/config.js';

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
