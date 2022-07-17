import { InputType, OmitType} from "@nestjs/graphql";
import { Restaurant } from "../entities/reataurant.entity";


@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant,['id']){}