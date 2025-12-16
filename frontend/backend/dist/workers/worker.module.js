"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkersModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const notifications_processor_1 = require("./notifications.processor");
const payment_processor_1 = require("./payment.processor");
const notifications_module_1 = require("../notifications/notifications.module");
const payments_module_1 = require("../payments/payments.module");
let WorkersModule = class WorkersModule {
};
exports.WorkersModule = WorkersModule;
exports.WorkersModule = WorkersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bullmq_1.BullModule.forRoot({
                connection: {
                    host: process.env.REDIS_HOST || 'localhost',
                    port: Number(process.env.REDIS_PORT) || 6379,
                },
            }),
            bullmq_1.BullModule.registerQueue({ name: 'notifications' }, { name: 'payments' }),
            notifications_module_1.NotificationsModule,
            payments_module_1.PaymentsModule,
        ],
        providers: [notifications_processor_1.NotificationsProcessor, payment_processor_1.PaymentsProcessor],
    })
], WorkersModule);
//# sourceMappingURL=worker.module.js.map