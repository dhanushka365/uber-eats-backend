import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as Joi from 'joi'
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Restaurant } from './restaurants/entities/reataurant.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { CommonModule } from './common/common.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal:true,
        envFilePath: process.env.NODE_ENV ==='dev' ? '.env.dev' : '.env.test',
        ignoreEnvFile: process.env.NODE_ENV === 'prod',
        validationSchema: Joi.object({
          NODE_ENV: Joi.string().valid('dev','prod').required(),
          DB_HOST: Joi.string().required(),
          DB_PORT: Joi.string().required(),
          DB_USERNAME: Joi.string().required(),
          DB_PASSWORD: Joi.string().required(),
          DB_NAME: Joi.string().required(),
          SECRET_KEY:Joi.string().required(),
        })

      }
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: true,//need to see everything happens in database.if we are in production mode we can make it false.
      entities:[Restaurant,User],//restaurant becomes an entity in database
    }),

    //dynamic module
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      buildSchemaOptions: {},
    }),
    RestaurantsModule,
    UsersModule,
    CommonModule,
    JwtModule.forRoot({
      privateKey: process.env.SECRET_KEY,
    }),//static module
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
