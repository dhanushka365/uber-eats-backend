import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from 'typeorm'
import { Injectable } from "@nestjs/common";
import { CreateAccountInput } from "./dtos/create-account.dto";


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly users: Repository<User>,
    ){} 


    async createAccount({
        email, 
        password,
        role,
    }:CreateAccountInput): Promise<string | undefined>{
        try {
            const exists = await this.users.findOne({});
            if (exists) {
                return 'Thereis a user with that email already';
            }

            await this.users.save(this.users.create({email , password, role}));
        }catch (e) {
         return "Couldn't create account";
     }
    }
}