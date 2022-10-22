
exports.up = function(knex) {
    return knex.schema.createTable('User', (table)=>{
      table.increments("user_id").primary()
      table.string("email").unique().notNullable()
      table.string("password").notNullable()
      table.string("name").notNullable()
      table.string("url").notNullable()
      table.string("whatsapp").notNullable()
      table.string("bio")
      table.string("color")
      table.string("avatar_url")
    })
  };
  
  exports.down = knex => knex.schema.dropTable('User')
  
  