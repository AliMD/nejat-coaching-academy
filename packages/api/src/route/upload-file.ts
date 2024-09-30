import {join} from 'path';

import {writeFile} from '@alwatr/node-fs';
import sharp from 'sharp';

import {config, logger} from '../lib/config.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';
import {nanotronApiServer} from '../lib/server.js';

const forbiddenCharacters = /[^a-zA-Z0-9._/-]/g;

const imageFilePresetRecord = {
  'agent-document': {
    client: {
      defaultAppendName: '.jpeg',
      quality: 75,
      height: -1 as number,
      width: 640 as number,
    },
    format: [
      {
        type: 'webp',
        appendName: '.webp.org',
        formatOptions: {
          quality: 75,
        },
      },
      {
        type: 'jpeg',
        appendName: '.jpeg',
        formatOptions: {
          quality: 75,
          mozjpeg: true,
        },
      },
    ],
  },
} as const;

/**
 * POST `/file/upload` - Upload a file to the server.
 */
nanotronApiServer.defineRoute({
  method: 'POST',
  url: '/file/upload',
  async handler() {
    logger.logMethod?.('defineRoute(`/file/upload`)');

    const buffer = await this.getBodyRaw();
    if (!buffer.length) {
      this.serverResponse.replyErrorResponse({
        ok: false,
        errorCode: 'empty_body',
        errorMessage: 'Invalid file data',
      });
      return;
    }

    const fileName = this.queryParams.fileName;
    if (fileName === undefined || forbiddenCharacters.test(fileName) === true) {
      this.serverResponse.replyErrorResponse({
        ok: false,
        errorCode: 'invalid_file_name',
        errorMessage: 'Invalid file name',
      });
      return;
    }

    const absolutePath = join(config.upload.basePath, fileName);

    const variants = [];
    for (const presetItem of imageFilePresetRecord['agent-document'].format) {
      const optimizedBuffer = await sharp(buffer)
        .toFormat(presetItem.type, {...presetItem.formatOptions})
        .toBuffer();
      await writeFile(absolutePath + presetItem.appendName, optimizedBuffer.toString());
      variants.push(presetItem.appendName);
    }

    await writeFile(absolutePath, buffer.toString());

    // TODO: Save data of the file
    const fileMetaCollection = await alwatrNitrobase.openCollection(config.stores.fileMetaCollection);
    const fileId = fileMetaCollection.appendItem({
      fileName,
      variants,
    });
    fileMetaCollection.save();

    this.serverResponse.replyJson({
      ok: true,
      data: {
        fileId,
      },
    });
  },
});
