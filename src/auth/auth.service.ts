import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthDocument, User } from './user.entity';
import { Model } from 'mongoose'
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Payload } from './payload';

@Injectable()
export class AuthService {
    [x: string]: any;
    constructor(
        @InjectModel(User.name)
        private readonly model: Model<AuthDocument>
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto
        const findUser = await this.model.findOne({ username });
        if (findUser) {
            throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new this.model({ username, password: hashedPassword });
        try {
            await user.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException();
            }
            throw error;
        }

    }

    async signPayload(payload: Payload) {
        return sign(payload, ',abcd1234', { expiresIn: '7d' });
    }

    async Login(authCredentialsDto: AuthCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = await this.model.findOne({ username });
        const check = await bcrypt.compare(password, user.password)
        if (user && (check)) {
            const payload: Payload = { username };
            const accessToken = await this.signPayload(payload);
            return { accessToken };
        } else {
            throw new HttpException('user doesn\'t exists', HttpStatus.BAD_REQUEST);
        }
    }

    async findByPayload(payload: Payload) {
        const { username } = payload
        console.log(username);
        return await this.model.findOne({ username })
    }

    // async validateUser(username: string, pass: string) {
    //     // find if user exist with this email
    //     const user = await this.userService.findOne(username);
    //     if (!user) {
    //         return null;
    //     }

    //     // find if user password match
    //     const match = await this.comparePassword(pass, user.password);
    //     if (!match) {
    //         return null;
    //     }

    //     // tslint:disable-next-line: no-string-literal
    //     const { password, ...result } = user['dataValues'];
    //     return result;
    // }
}
