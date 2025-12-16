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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon2 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await argon2.hash(dto.password);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                role: dto.role || client_1.Role.CANDIDATE,
                profile: {
                    create: {
                        firstName: dto.profile.firstName,
                        lastName: dto.profile.lastName,
                        phone: dto.profile.phone,
                    },
                },
            },
            include: {
                profile: true,
            },
        });
        const tokens = await this.signToken(user.id, user.email, user.role);
        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                profile: user.profile,
            },
        };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
            include: { profile: true },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const valid = await argon2.verify(user.password, dto.password);
        if (!valid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('Account is deactivated');
        }
        const tokens = await this.signToken(user.id, user.email, user.role);
        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                profile: user.profile,
            },
        };
    }
    async signToken(userId, email, role) {
        const payload = { sub: userId, email, role };
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1d',
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        });
        return {
            token: accessToken,
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async refreshToken(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return this.signToken(user.id, user.email, user.role);
    }
    async validateUser(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { profile: true },
        });
        if (!user || !user.isActive) {
            return null;
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map