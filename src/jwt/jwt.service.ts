import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { JwtModuleOptions } from './jwt.interfaces';
import { CONFIG_OPTIONS } from './jwt.constants';
import * as jwt from "jsonwebtoken";
@Injectable()
export class JwtService {

    constructor(
        @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions){
    
        }
    
    sign(payload:object): string{
        return jwt.sign(payload, this.options.privateKey)
    }
}
