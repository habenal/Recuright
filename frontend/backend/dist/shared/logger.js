"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = createLogger;
const pino_1 = require("pino");
function createLogger(env = 'development') {
    return (0, pino_1.default)({ level: process.env.LOG_LEVEL || 'info', transport: env !== 'production' ? { target: 'pino-pretty' } : undefined });
}
//# sourceMappingURL=logger.js.map