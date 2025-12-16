"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma/prisma.service");
const ioredis_1 = require("ioredis");
let HealthController = class HealthController {
    constructor(prisma) {
        this.prisma = prisma;
        this.redis = new ioredis_1.default(process.env.REDIS_URL || 'redis://localhost:6379');
        this.redis.on('error', (err) => {
            console.warn('Redis connection error:', err?.message ?? err);
        });
    }
    healthz() {
        return { ok: true };
    }
    async readiness() {
        const details = {
            db: true,
            redis: true,
            errors: [],
        };
        try {
            await this.prisma.$queryRaw `SELECT 1`;
        }
        catch (e) {
            details.db = false;
            details.errors.push('db');
        }
        try {
            await this.redis.ping();
        }
        catch (e) {
            details.redis = false;
            details.errors.push('redis');
        }
        return { ok: details.db && details.redis, details };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)('healthz'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "healthz", null);
__decorate([
    (0, common_1.Get)('readiness'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "readiness", null);
exports.HealthController = HealthController = __decorate([
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HealthController);
//# sourceMappingURL=health.controller.js.map