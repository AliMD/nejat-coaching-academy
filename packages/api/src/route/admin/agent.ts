import {config, logger} from '../../lib/config.js';
import {cryptoFactory} from '../../lib/crypto.js';
import {alwatrNitrobase} from '../../lib/nitrobase.js';
import {nanotronApiServer} from '../../lib/server.js';
import {parseRequestBody} from '../../pre-handler/parse-request-body.js';

import type {AdminAgentFormData} from '@alwatr/swiss-plus-support-common';

nanotronApiServer.defineRoute<{requestBody: AdminAgentFormData}>({
  method: 'PUT',
  url: '/admin/agent/new',
  preHandlers: [parseRequestBody],
  async handler() {
    logger.logMethodArgs?.('defineRoute(`/admin/agent/new`)', {body: this.sharedMeta.requestBody});

    const receivedAgentData = this.sharedMeta.requestBody;

    // add new agent to the agent's collection
    const agentsCollection = await alwatrNitrobase.openCollection<AdminAgentFormData>(config.stores.agentsCollection);
    const agentCollectionItems = agentsCollection.items();

    let agentItemsIteratorResultObject;
    while ((agentItemsIteratorResultObject = agentCollectionItems.next()).done === false) {
      const _agentItem = agentItemsIteratorResultObject.value.data;

      if (_agentItem.nationalCode !== receivedAgentData.nationalCode || _agentItem.phoneNumber !== receivedAgentData.phoneNumber) {
        continue;
      }

      agentItemsIteratorResultObject = {...agentItemsIteratorResultObject, done: true};
      break;
    }

    logger.logMethodArgs?.('defineRoute(`/admin/agent/new`)', {agentItemsIteratorResultObject});

    const replyObject: JsonObject = {
      ok: true,
    };

    if (agentItemsIteratorResultObject.value === undefined) {
      const agentId = cryptoFactory.generateUserId();

      receivedAgentData.id = agentId;
      agentsCollection.addItem(agentId, receivedAgentData);

      replyObject.message = 'A new agent added.';
      replyObject.data = {
        id: agentId,
      };
    }
    else {
      agentsCollection.mergeItemData(agentItemsIteratorResultObject.value.data.id, receivedAgentData);
      replyObject.message = 'An agent updated.';
      replyObject.data = {...receivedAgentData, id: agentItemsIteratorResultObject.value.data.id};
    }

    agentsCollection.save();

    this.serverResponse.replyJson(replyObject);
  },
});
