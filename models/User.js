const { DataTypes } = require('sequelize');
const db = require('../config/config')

const User = db.define('usuarios', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
    },
    e_mail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

User.sync()
  .then(() => {
    console.log('Modelo User sincronizado com o banco de dados.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o modelo User:', err);
  });

module.exports = User;