
exports.up = function(knex) {
    return knex.schema.alterTable('Product', (table)=>{
      table.string("variation")
      table.string('data', 1000);
    })
  };
  
exports.down = knex => {
    return knex.schema.alterTable('Product', (table)=>{
    table.dropColumn("variation")
    table.dropColumn("data")
  })
};
  
  