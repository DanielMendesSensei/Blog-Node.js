const { DataTypes } = require('sequelize');
const db = require('../config/config')

const Post = db.define('postagens', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
})

Post.sync()
  .then(() => {
    console.log('Modelo Post sincronizado com o banco de dados.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o modelo Post:', err);
  });

module.exports = Post;