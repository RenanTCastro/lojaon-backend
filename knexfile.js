
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
      connectionString: 'postgres://ndkqluawihosqf:7051f1f32e90613480c4856a75f98bc88752ee601485bb6f0a1df1115048eeb1@ec2-3-230-122-20.compute-1.amazonaws.com:5432/d3d48bbuuqsogn',
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: __dirname + "./src/database/migrations",
    }
  },
};
