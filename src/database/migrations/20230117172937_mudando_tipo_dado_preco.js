
exports.up = function(knex) {
    return knex.schema.alterTable('Product', (table)=>{
      table.string("price").alter();
    })
  };
  
exports.down = knex => {
    return knex.schema.alterTable('Product', (table)=>{
    table.price("price").alter();
  })
};
  
  