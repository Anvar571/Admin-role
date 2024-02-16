import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('passwords', function(table) {
        table.increments('id').primary();
        table.integer('account_id').references('accounts.id')
        table.string('hash').notNullable();
        table.boolean('is_active').notNullable().defaultTo(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').nullable();
    })
}


export async function down(knex: Knex): Promise<void> {
}

