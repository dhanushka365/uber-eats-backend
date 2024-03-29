import { Resolver,Query, Mutation, Args } from "@nestjs/graphql";
import { of } from "rxjs";
import { CreateAccountInput, CreateAccountOutput } from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";


@Resolver(of => User)
export class UsersResolver{
 constructor(private readonly userService: UsersService){}

 @Query(returns => Boolean)
 hi(){
    return true;
 }

 @Mutation(returns => CreateAccountOutput)
 async createAccount(@Args('input') createAccountInput:CreateAccountInput
 ): Promise<CreateAccountOutput>{
   try {
      const [ok ,error] = await this.userService.createAccount(createAccountInput);
      return{
         ok,
         error,
         
      };
   } catch (e) {
      return {
         error:e,
         ok:false,
         
      }
   }

 }


 @Mutation(returns => LoginOutput)
 async login (@Args('input') loginInput:LoginInput):Promise<LoginOutput>{
   try {
      return this.userService.login(loginInput)
    
      
   } catch (error) {
      return{
         ok:false,
         error,
      };
   }
 }
}