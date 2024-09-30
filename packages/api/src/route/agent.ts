import {config, logger} from '../lib/config.js';
import {nanotronApiServer} from '../lib/server.js';
import {alwatrStore} from '../lib/store.js';
import {parseRequestBody} from '../pre-handler/parse-request-body.js';

import type {AgentFormData} from '@alwatr/weaver-common';

nanotronApiServer.defineRoute<{requestBody: AgentFormData}>({
  method: 'PUT',
  url: '/agent/save',
  preHandlers: [parseRequestBody],
  async handler() {
    logger.logMethodArgs?.('defineRoute(`/agent/save`)', {body: this.sharedMeta.requestBody});

    // add new agent to the agent's collection
    const agentsCollection = await alwatrStore.openCollection<AgentFormData>(config.stores.agentsCollection);
    const agentId = agentsCollection.appendItem(this.sharedMeta.requestBody);
    agentsCollection.save();

    this.serverResponse.replyJson({
      ok: true,
      data: {
        id: agentId,
      },
    });
  },
});
