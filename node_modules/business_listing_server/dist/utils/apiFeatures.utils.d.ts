import { JwtService } from '@nestjs/jwt';
export default class APIFeatures {
    static assignJwtToken(userId: string, jwtService: JwtService): Promise<string>;
}
