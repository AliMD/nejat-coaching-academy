import {packageTracer} from '@alwatr/package-tracer';

export * from './types/main.js';
export * from './constant.js';
export * from './validate-national-code.js';

packageTracer.add(__package_name__, __package_version__);
