import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository,FindOptionsWhere} from 'typeorm'
import { Injectable } from "@nestjs/common";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { IsEmail } from "class-validator";


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly users: Repository<User>,){} 


    async createAccount({email, password,role}:CreateAccountInput): Promise<[boolean ,string?]>{
        try {
            const exists = await this.users.findOneBy({ email:email } as FindOptionsWhere<User>);

            if (exists) {
                return [false, 'There is a user with that email already'];
            }

            await this.users.save(this.users.create({email , password, role}));
            return[true];
        }catch (e) {
         return [false,"Couldn't create account"];
     }
    }
}


