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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const dto_1 = require("./dto");
let ApplicationsService = class ApplicationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async apply(userId, dto) {
        const job = await this.prisma.job.findUnique({ where: { id: dto.jobId } });
        if (!job)
            throw new common_1.NotFoundException('Job not found');
        return this.prisma.application.create({
            data: {
                candidateId: userId,
                jobId: dto.jobId,
                coverLetter: dto.coverLetter,
                status: dto_1.ApplicationStatus.APPLIED,
            },
        });
    }
    async getApplications(userId) {
        return this.prisma.application.findMany({
            where: { candidateId: userId },
            include: { job: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateStatus(applicationId, dto) {
        const app = await this.prisma.application.findUnique({ where: { id: applicationId } });
        if (!app)
            throw new common_1.NotFoundException('Application not found');
        return this.prisma.application.update({
            where: { id: applicationId },
            data: { status: dto.status },
        });
    }
    async getByJob(jobId) {
        return this.prisma.application.findMany({
            where: { jobId },
            include: { candidate: true },
        });
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map