import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Put,
    Request,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdatePasswordDto } from './dto/users.user.dto';
import { RenderUser } from './renderUser.users';
import { PrismaService } from 'src/prisma.service';

@ApiTags('user')
@Controller('user')
export class UsersController {
    constructor(private readonly prismaService: PrismaService,
        private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('me')
    public async me(@Request() req) {
        return new RenderUser(req.user);
    }
    @UseGuards(JwtAuthGuard)
    @ApiSecurity('access-key')
    @UseInterceptors(ClassSerializerInterceptor)
    @Put('update/password')
    public async updatePassword(@Request() req, @Body()
    updatePasswordDto: UpdatePasswordDto) {
        await this.usersService
            .updatePassword(updatePasswordDto, req.user.id);
        return {
            message: "password_update_success"
        };
    }

}