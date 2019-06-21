require('dotenv').config(); // magic

module.exports = {
  "development" : {
    "database" : process.env.DB_DATABASE || 'arka_notes',
    "username" : process.env.DB_USERNAME || 'root',
    "password" : process.env.DB_PASSWORD || null,
    "host" : process.env.DB_HOST || 'localhost',
    "dialect" : "mysql",
    "operatorAliases": false,
  },

  "production": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },

  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

