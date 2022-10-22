
exports.up = function(knex) {
    return knex.schema.createTable('Product', (table)=>{
      table.increments("product_id").primary()
      table.integer('user_id')
      table.foreign('user_id')
           .references('User.user_id')
           .onDelete('CASCADE')
      table.string("name").notNullable()
      table.string("description")
      table.float("price").notNullable()
      table.string("image")
      table.string("code")
    })
  };
  
  exports.down = knex => knex.schema.dropTable('Product')
  
  