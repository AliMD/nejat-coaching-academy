import {logger} from './lib/config.js';
import {initializeStore} from './lib/store.js';
import './route/admin/agent.js';
import './route/agent.js';
import './route/home.js';
import './route/upload-file.js';
import './route/user.js';

logger.banner('alwatr-weaver-api');

initializeStore();
