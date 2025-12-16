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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationsController = void 0;
const common_1 = require("@nestjs/common");
const applications_service_1 = require("./applications.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const role_enum_1 = require("../common/enums/role.enum");
let ApplicationsController = class ApplicationsController {
    constructor(applicationsService) {
        this.applicationsService = applicationsService;
    }
    apply(req, dto) {
        return this.applicationsService.apply(req.user.userId, dto);
    }
    getMyApplications(req) {
        return this.applicationsService.getApplications(req.user.userId);
    }
    updateStatus(id, dto) {
        return this.applicationsService.updateStatus(id, dto);
    }
    getByJob(jobId) {
        return this.applicationsService.getByJob(jobId);
    }
};
exports.ApplicationsController = ApplicationsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.CANDIDATE),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateApplicationDto]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "apply", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.CANDIDATE),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "getMyApplications", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.EMPLOYER, role_enum_1.Role.RECRUITER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateStatusDto]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('job/:jobId'),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.EMPLOYER),
    __param(0, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ApplicationsController.prototype, "getByJob", null);
exports.ApplicationsController = ApplicationsController = __decorate([
    (0, common_1.Controller)('applications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [applications_service_1.ApplicationsService])
], ApplicationsController);
//# sourceMappingURL=applications.controller.js.map