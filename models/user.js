// //this when i add sequelize

// const Sequelize =require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   userName:Sequelize.STRING,
//   userPassword:Sequelize.STRING,
// });

// module.exports = User;
const Sequelize =require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userName:Sequelize.STRING,
  email:Sequelize.STRING,
  userPassword:Sequelize.STRING,
});

module.exports = User;