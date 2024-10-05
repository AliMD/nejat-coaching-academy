import {html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import {fileUploaderJsonFSM} from './context.js';
import {BaseElement} from '../base-element.js';
import {snackbarSignal} from '../snackbar/main.js';

declare global {
  interface HTMLElementTagNameMap {
    'file-uploader': FileUploaderComponent;
  }
}

@customElement('file-uploader')
export class FileUploaderComponent extends BaseElement {
  @property() renderState: typeof fileUploaderJsonFSM.state;

  @query('input[type="file"]')
  private fileInputElement?: HTMLInputElement;

  constructor() {
    super();
    this.renderState = 'initial';
  }


  override connectedCallback(): void {
    super.connectedCallback();

    fileUploaderJsonFSM.subscribe(({state}) => {
      this.renderState = state;

      this.fileInputElement!.disabled = state === 'loading';

      if (state === 'complete') {
        // TODO: Handle situations that `ok` is equal `false` & there is the `error_code` key
        if (!fileUploaderJsonFSM.jsonResponse?.ok) {
          snackbarSignal.notify({
            content: 'خطا در بارگذاری فایل.',
          });

          this.fileInputElement!.value = '';
          return;
        }

        const event = new CustomEvent('on-file-uploaded', { detail: fileUploaderJsonFSM.jsonResponse?.data });
        this.dispatchEvent(event);
      }

      if (state === 'failed') {
        this.fileInputElement!.value = '';
      }
    });
  }

  private onFileSelection_(event: Event) {
    const files = (event.target as HTMLInputElement).files
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
        }
      });
    };


    reader.readAsArrayBuffer(files[0]);
  }

  override render() {
    return html`
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">بارگذاری تصویر</label>
      <input
        @change=${this.onFileSelection_}
        type="file"
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50
        dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      >
    `;
  }
}
