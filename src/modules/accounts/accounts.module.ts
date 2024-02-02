import { Module } from "@nestjs/common";
import { AccountController } from "./accounts.controller";
import { AccountService } from "./accounts.service";
import { AccountRepository } from "./accounts.repository";

@Module({
  controllers: [AccountController],
  providers: [AccountService, AccountRepository]
})
export class AccountModule {}