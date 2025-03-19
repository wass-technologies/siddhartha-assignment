import { Strategy } from 'passport-jwt';
import { Account } from 'src/account/entities/account.entity';
import { Repository } from 'typeorm';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly accountRepository;
    constructor(accountRepository: Repository<Account>);
    validate(payload: any): Promise<Account>;
}
export {};
