require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'lojaon_db',
      user:     'postgres',
      password: 'admin'
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations` 
    },
  },

  production: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations` 
    },
  },
};
