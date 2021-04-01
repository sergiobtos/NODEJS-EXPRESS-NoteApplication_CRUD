
exports.up = function(knex) {
  return knex.schema.createTable('notes', function(t){
      t.increments('id').primary()
      t.string('title').notNullable()
      t.string('body').notNullable()
      t.timestamps(false, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableExists('notes')
};
