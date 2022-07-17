import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from 'typeorm'
import { CreateRestaurantDto } from "./dtos/create-restaurant.dto";
import { Restaurant } from "./entities/reataurant.entity";



@Injectable()
export class RestaurantService { 
    constructor(@InjectRepository(Restaurant)private readonly restaurants: Repository<Restaurant>,){}

    getAll():Promise<Restaurant[]>{
     return this.restaurants.find();
    }

    createRestaurants(createRestaurantDto : CreateRestaurantDto): Promise<Restaurant>{
        const newRestaurant = this.restaurants.create(createRestaurantDto);
        return this.restaurants.save(newRestaurant);
    }
}