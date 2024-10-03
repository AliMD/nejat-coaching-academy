import {config, logger} from '../../lib/config.js';
import {cryptoFactory} from '../../lib/crypto.js';
import {alwatrNitrobase} from '../../lib/nitrobase.js';
import {nanotronApiServer} from '../../lib/server.js';
import {parseBodyAsJson} from '../../pre-handler/parse-request-body.js';
import {sanitizeNumbers} from '../../pre-handler/sanitize-numbers.js';

import type {AdminAgentFormData} from '@alwatr/swiss-plus-support-common';

nanotronApiServer.defineRoute<{body: AdminAgentFormData}>({
  method: 'PUT',
  url: '/admin-save-agent',
  preHandlers: [parseBodyAsJson, sanitizeNumbers],
  async handler() {
    logger.logMethodArgs?.('defineRoute(`/admin-save-agent`)', {body: this.sharedMeta.body});

    const receivedAgentData = this.sharedMeta.body;

    // add new agent to the agent's collection
    const agentsCollection = await alwatrNitrobase.openCollection<AdminAgentFormData>(config.stores.agentsCollection);
    const agentCollectionItems = agentsCollection.items();

    let agentItemsIteratorResultObject;
    while ((agentItemsIteratorResultObject = agentCollectionItems.next()).done === false) {
      const _agentItem = agentItemsIteratorResultObject.value.data;

      if (_agentItem.nationalCode !== receivedAgentData.nationalCode || _agentItem.cellPhoneNumber !== receivedAgentData.cellPhoneNumber) {
        continue;
      }

      agentItemsIteratorResultObject = {...agentItemsIteratorResultObject, done: true};
      break;
    }

    logger.logMethodArgs?.('defineRoute(`/admin-save-agent`)', {agentItemsIteratorResultObject});

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
