import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('accounts', function(table) {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.integer('role_id').notNullable();
        table.string('phone').notNullable().unique();
        table.enum('type', ['company', 'accounts', 'employees']).notNullable();
        table.string('photo').notNullable();
        table.enum('status', ['active', 'deleted', 'block', 'pending']);
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('accounts');
}

