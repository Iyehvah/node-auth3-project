
exports.up = async function(knex) {
  await knex.schema.createTable("users", (table) => {
      table.increments("ID")
      table.text("username").notNull().unique()
      table.text("password").notNull()
      table.text("department").notNull()
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("users")
};
