import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('role', function (table ) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').nullable();
    table.enum('status', ['enable', 'disable', 'deleted']);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('role')
}

