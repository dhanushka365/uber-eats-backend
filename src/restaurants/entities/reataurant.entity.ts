import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { number } from "joi";
import { type } from "os";
import { Entity ,Column ,PrimaryGeneratedColumn} from "typeorm";


@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class Restaurant{
    @PrimaryGeneratedColumn()
    @Field(type => Number)
    id: number;

    @Field(type => String)
    @Column()
    @IsString()
    @Length(5)
    name:string;
    
    @Field(type => Boolean, {nullable: true})
    @Column({default: true})
    @IsOptional()
    isVegan: boolean;

    @Field(type => String , {defaultValue:'no address'})
    @Column()
    @IsString()
    address: String;

}