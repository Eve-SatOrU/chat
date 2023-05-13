const { Model, DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const { caesarEncrypt } = require('../util/crypto');
const { caesarDecrypt } = require('../util/crypto');

class Message extends Model {}

Message.init({
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      if (this.getDataValue('encrypted')) {
        return caesarDecrypt(this.getDataValue('content'));
      } else {
        return this.getDataValue('content');
      }
    },
    set(value) {
      console.log('Original message:', value);
      const encrypted = caesarEncrypt(value, 1);
      console.log('Encrypted message:', encrypted);
      this.setDataValue('content', encrypted);
    }
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  encrypted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, { sequelize });

module.exports = Message;
