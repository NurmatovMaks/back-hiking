const { Sequelize } = require("sequelize");

require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DATABASE_URL } =
  process.env;

let sequelize;

if (process.env.NODE_ENV === "production") {
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: "postgres",
    host: DB_HOST,
    port: DB_PORT,
  });
}

module.exports = sequelize;
