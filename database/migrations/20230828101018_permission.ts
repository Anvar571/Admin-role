import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('permission', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('permission');
}

