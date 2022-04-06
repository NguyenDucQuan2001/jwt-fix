import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Payload } from './payload';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'abcd1234',
        });
    }

    // async validate(username: string, password: string): Promise<any> {
    //     const user = await this.authService.validateUser(username, password)

    //     if (!user) {
    //         throw new UnauthorizedException('Invalid user credentials')
    //     }
    //     return user;
    // }

    async validate(payload: Payload): Promise<User> {
        const user: User = await this.authService.findByPayload(payload)
        if (!user) {
            throw new UnauthorizedException()
        }
        return user
    }
}
 // async validate(username: string, password: string): Promise<any> {
    //     const user = await this.authService.validateUser(username, password);
    //     if (!user) {
    //         throw new UnauthorizedException('Invalid credentials');
    //     }
    //     return user;
    // }