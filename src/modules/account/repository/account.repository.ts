import { Inject } from "@nestjs/common";
import { Knex } from "knex";
import { DB_CONNECTION_NAME } from "src/shared/injects";

export class AccountsRepository {
    constructor(
        @Inject(DB_CONNECTION_NAME) private readonly knex: Knex
    ) {}

    findAllAccounts() {}
}