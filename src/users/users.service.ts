import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository,FindOptionsWhere} from 'typeorm'
import { Injectable } from "@nestjs/common";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { IsEmail } from "class-validator";
import { LoginInput } from "./dtos/login.dto";


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


    async login({
        email ,
        password,
    }: LoginInput): Promise<{ok:boolean; error?:string, token?:string}>{

        try {
            const user = await this.users.findOneBy({ email:email } as FindOptionsWhere<User>);
            if(!user){
                return{
                    ok:false,
                    error: 'user not found',       
                };
            }
            const passwordCorrect = await user.checkPassword(password);
            if (!passwordCorrect) {
                return{
                    ok:false,
                    error: 'worng password',
                    
                };
            }
            return{
                ok:true,
                token:'lalalalalala',
            };

        } catch (error) {
            return{
                ok:false,
                error,   
            };
        }
    }
}


