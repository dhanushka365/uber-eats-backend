import { Field, ObjectType } from "@nestjs/graphql";
import { number } from "joi";
import { type } from "os";
import { Entity ,Column ,PrimaryGeneratedColumn} from "typeorm";



@ObjectType()
@Entity()
export class Restaurant{
    @PrimaryGeneratedColumn()
    @Field(type => Number)
    id: number;

    @Field(type => String)
    @Column()
    name:string;
    
    @Field(type => Boolean)
    @Column()
    isVegan: boolean;

    @Field(type => String)
    @Column()
    address: String;

    @Field(type => String)
    @Column()
    ownerName: String

    @Field(type => String)
    @Column()
    CategoryName: String

}