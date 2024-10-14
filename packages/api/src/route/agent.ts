import {config, logger} from '../lib/config.js';
import {cryptoFactory} from '../lib/crypto.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';
import {nanotronApiServer} from '../lib/server.js';
import {parseBodyAsJson} from '../pre-handler/parse-request-body.js';
import {sanitizeNumbers} from '../pre-handler/sanitize-numbers.js';

nanotronApiServer.defineRoute<{body: AgentFormData}>({
  method: 'PUT',
  url: '/save-agent',
  preHandlers: [parseBodyAsJson, sanitizeNumbers],
  async handler() {
    logger.logMethodArgs?.('defineRoute(`/save-agent`)', {body: this.sharedMeta.body});

    const agentsCollection = await alwatrNitrobase.openCollection<AgentFormData>(config.stores.agentsCollection);

    // add new agent to the agent's collection
    const agentId = cryptoFactory.generateUserId();
    agentsCollection.addItem(agentId, this.sharedMeta.body);
    agentsCollection.save();

    this.serverResponse.replyJson({
      ok: true,
      data: {
        id: agentId,
      },
    });
  },
});
