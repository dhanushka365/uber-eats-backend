import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { type } from "os";
import { CoreEntity } from "src/common/entities/core.entity";
import { Entity ,Column} from "typeorm";


enum UserRole {
    Client,
    Owner,
    Delivery,
}

//create enum on graphql
registerEnumType(UserRole , {name:'UserRole'});



@InputType({isAbstract:true})
@ObjectType()
@Entity()
export class User extends CoreEntity{
    @Column()
    @Field(type=>String)
    email:String;

    @Column()
    @Field(type=>String)
    password:String;

    @Column({type:'enum',enum:UserRole})
    @Field(type=>UserRole)
    role: UserRole;
}