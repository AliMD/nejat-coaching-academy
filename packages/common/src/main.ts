import {packageTracer} from '@alwatr/package-tracer';

export * from './constant.js';
export * from './validate-national-code.js';

export type * from './types/main.js';

packageTracer.add(__package_name__, __package_version__);
