import { Injectable } from "@nestjs/common";
import { AuthOptionsFactory, IAuthModuleOptions } from "@nestjs/passport";

@Injectable()
export class PassportConfig implements AuthOptionsFactory {
    createAuthOptions(): IAuthModuleOptions<any> | Promise<IAuthModuleOptions<any>> {
         return {
            defaultStrategy: 'jwt',
         }
    }
}