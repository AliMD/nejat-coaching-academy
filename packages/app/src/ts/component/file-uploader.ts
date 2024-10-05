import {html} from 'lit';
import {customElement, query, state} from 'lit/decorators.js';

import {BaseElement} from './base-element.js';
import {fileUploaderJsonFSM} from './context.js';
import {snackbarSignal} from './snackbar/main.js';

import type {ServerRequestState} from 'alwatr/flux';

declare global {
  interface HTMLElementTagNameMap {
    'file-uploader': FileUploaderComponent;
  }
}

@customElement('file-uploader')
export class FileUploaderComponent extends BaseElement {
  @state() renderState_: ServerRequestState = 'initial';

  @query('input[type="file"]')
  private fileInputElement__?: HTMLInputElement;

  constructor() {
    super();

    fileUploaderJsonFSM.subscribe(({state}) => {
      this.renderState_ = state;

      this.fileInputElement__!.disabled = state === 'loading';

      if (state === 'complete') {
        // TODO: Handle situations that `ok` is equal `false` & there is the `error_code` key
        if (!fileUploaderJsonFSM.jsonResponse?.ok) {
          snackbarSignal.notify({
            content: 'خطا در بارگذاری فایل.',
          });

          this.fileInputElement__!.value = '';
          return;
        }

        const event = new CustomEvent('on-file-uploaded', {detail: fileUploaderJsonFSM.jsonResponse?.data});
        this.dispatchEvent(event);
      }

      if (state === 'failed') {
        this.fileInputElement__!.value = '';
      }
    });
  }

  private onFileSelection__(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files === null) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = (event) => {
      const buffer = event.target?.result;
      if (!buffer) {
        return;
      }

      fileUploaderJsonFSM.request({
        body: buffer,
        queryParams: {
          fileName: files[0].name,
        },
      });
    };

    reader.readAsArrayBuffer(files[0]);
  }

  override render() {
    return html`
      <label
        for="dropzone-file"
        class="flex flex-col gap-2 items-center justify-center w-full h-48 border-2 border-outline border-dashed rounded-lg
          cursor-pointer bg-surfaceVariant state-onSurfaceVariant text-bodyMedium"
      >
        <svg
          class="size-8"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 16"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            fill="none"
            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5
              5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
          />
        </svg>
        <p class="text-bodyLarge mt-2">آپلود تصویر گارانتی امضا شده</p>
        <p>برای بارگذاری <b>کلیک کنید</b> یا فایل را اینجا رها کنید</p>
        <input id="dropzone-file" type="file" class="hidden" />
      </label>
    `;
    // return html`
    //   <label
    //     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //     for="file_input"
    //   >بارگذاری تصویر</label>
    //   <input
    //     @change=${this.onFileSelection__}
    //     type="file"
    //     class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50
    //     dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
    //   >
    // `;
  }
}
