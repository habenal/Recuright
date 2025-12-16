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
exports.PaymentsProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const payments_service_1 = require("../payments/payments.service");
let PaymentsProcessor = class PaymentsProcessor extends bullmq_1.WorkerHost {
    constructor(paymentsService) {
        super();
        this.paymentsService = paymentsService;
    }
    async process(job) {
        switch (job.name) {
            case 'verify-payment':
                return this.handleVerifyPayment(job);
            default:
                throw new Error(`Unknown job name: ${job.name}`);
        }
    }
    async handleVerifyPayment(job) {
        const { transactionId } = job.data;
        await this.paymentsService.confirmPayment(transactionId, 'COMPLETED');
    }
};
exports.PaymentsProcessor = PaymentsProcessor;
exports.PaymentsProcessor = PaymentsProcessor = __decorate([
    (0, bullmq_1.Processor)('payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsProcessor);
//# sourceMappingURL=payment.processor.js.map