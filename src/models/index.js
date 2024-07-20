const fs = require("fs");
const path = require("path");

const dbConf = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConf.DB, dbConf.USER, dbConf.PASSWORD, {
  host: dbConf.HOST,
  port: dbConf.PORT,
  dialect: dbConf.dialect,
  pool: {
    max: dbConf.pool.max || 5,
    min: dbConf.pool.min || 0,
    acquire: dbConf.pool.acquire || 30000,
    idle: dbConf.pool.idle || 10000,
  },
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connection established...!");
  })
  .catch((err) => {
    console.log("error : ", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Charger tous les modèles automatiquement
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== "index.js" && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Définir les associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized successfully...!");
});

module.exports = db;
