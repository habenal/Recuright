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
exports.AssessmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AssessmentsService = class AssessmentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, candidateId) {
        return this.prisma.assessment.create({
            data: {
                ...dto,
                status: 'PENDING',
                title: dto.title,
                candidate: {
                    connect: { id: candidateId },
                },
            },
        });
    }
    async getCandidateAssessments(candidateId) {
        return this.prisma.assessment.findMany({
            where: { candidateId },
            orderBy: { scheduledAt: 'asc' },
        });
    }
    async updateScore(assessmentId, dto) {
        const assessment = await this.prisma.assessment.findUnique({ where: { id: assessmentId } });
        if (!assessment)
            throw new common_1.NotFoundException('Assessment not found');
        return this.prisma.assessment.update({
            where: { id: assessmentId },
            data: { score: dto.score, status: 'COMPLETED' },
        });
    }
    async getAll() {
        return this.prisma.assessment.findMany();
    }
};
exports.AssessmentsService = AssessmentsService;
exports.AssessmentsService = AssessmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssessmentsService);
//# sourceMappingURL=assessment.service.js.map