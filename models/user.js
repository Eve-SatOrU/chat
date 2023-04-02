// //this when i add sequelize
// const sequelize = require('../util/database');
// const { Model, DataTypes } = require('sequelize');
// class User extends Model {}

// User.init({
//   // Define the attributes of the User model
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, {
//   sequelize,
//   modelName: 'user'
// });
const Sequelize =require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
  userName:Sequelize.STRING,
  userPassword:Sequelize.STRING,
});

module.exports = User;