import { Controller, Get, UseGuards } from '@nestjs/common';
import { User, UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @UseGuards(AuthGuard)
    @Get('list')
    async getList():Promise<User>{
        console.log("get")
        return this.userService.findOne('john')
    }
}
