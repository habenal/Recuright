"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const helmet_1 = require("@fastify/helmet");
const cors_1 = require("@fastify/cors");
const compress_1 = require("@fastify/compress");
const nestjs_pino_1 = require("nestjs-pino");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    const configService = app.get(config_1.ConfigService);
    await app.register(helmet_1.default);
    await app.register(cors_1.default, {
        origin: configService.get('CORS_ORIGIN') || '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });
    await app.register(compress_1.default);
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const port = configService.get('PORT') || 3000;
    await app.listen(port, '0.0.0.0');
    console.log(`🚀 Application running on http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map