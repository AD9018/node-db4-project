
exports.up = function(knex) {
  return knex.schema
  .createTable('recipes', table =>{
      table.increments('recipe_id')
      table.string('recipe_name',128).notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
  })
  .creatTable('ingredients', table => {
      table.increments('ingredients_id')
      table.string('ingredients_name',128).notNullable()
  })
  .createTable('steps', table => {
      table.increments('steps_id')
      table.integer('steps_number',128).notNullable()
      table.string('step_instructions',128).notNullable()
      table.integer()
  })
  .createTable('steps_ingredients', table => {
      table.increments('steps_ingredients_id')
      table.string('quantity',128).notNullable()
      table.integer('step_id')
      .unsigned()
      .notNullable()
      .references('step_id')
      .inTable('steps')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      table.integer('ingredients_id')
      .unsigned()
      .notNullable()
      .references('ingredients_id')
      .inTable('ingredients')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
    return knex.schema
  .dropTableIfExists('steps_ingredients')
  .dropTableIfExists('steps')
  .dropTableIfExists('ingredients')
  .dropTableIfExists('recipes')
};
