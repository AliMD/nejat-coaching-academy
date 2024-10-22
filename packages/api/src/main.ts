import {logger} from './lib/config.js';
import {initializeStore} from './lib/intialize-nitrobase.js';
import './route/home.js';
import './route/sign-up.js';

logger.banner('nejat-coaching-academy-api');

initializeStore();
