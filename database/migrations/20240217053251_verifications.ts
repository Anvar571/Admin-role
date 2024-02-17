import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('verifications', function (table) {
        table.increments('id').primary();
        table.integer('account_id').notNullable().references('accounts.id')
        table.integer('code').notNullable()
        table.enum('action', [
            'registration',
            'login',
            'forget_password',
        ]);
        table.enum('status', ['success', 'pending', 'failed']);
        table.timestamp('expired_at').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
}

