//MYSQL DATABASE CONNECTION
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('blogapp','daniel','123456', {
    host: "localhost",
    dialect: "mysql"
});

module.exports = sequelize;