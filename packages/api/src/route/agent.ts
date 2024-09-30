import {config, logger} from '../lib/config.js';
import {cryptoFactory} from '../lib/crypto.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';
import {nanotronApiServer} from '../lib/server.js';
import {parseRequestBody} from '../pre-handler/parse-request-body.js';

import type {AgentFormData} from '@alwatr/swiss-plus-support-common';

nanotronApiServer.defineRoute<{requestBody: AgentFormData}>({
  method: 'PUT',
  url: '/agent/save',
  preHandlers: [parseRequestBody],
  async handler() {
    logger.logMethodArgs?.('defineRoute(`/agent/save`)', {body: this.sharedMeta.requestBody});

    const agentsCollection = await alwatrNitrobase.openCollection<AgentFormData>(config.stores.agentsCollection);

    // add new agent to the agent's collection
    const agentId = cryptoFactory.generateUserId();
    agentsCollection.addItem(agentId, this.sharedMeta.requestBody);
    agentsCollection.save();

    this.serverResponse.replyJson({
      ok: true,
      data: {
        id: agentId,
      },
    });
  },
});
