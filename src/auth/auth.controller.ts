import { Body, Controller, Get, Post, Req, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/signup')
    async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.authService.signUp(authCredentialsDto);
    }

    @Post('signin')
    async login(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return await this.authService.Login(authCredentialsDto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/test')
    getMe(@Req() req) {
        console.log(req)
        // return req;
    }
}
