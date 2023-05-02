// const { Model, DataTypes } = require('sequelize');
// const crypto = require('crypto');
// const sequelize =require('sequelize');

// class Message extends Model {}

// Message.init({
//   content: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     get() {
//       const algorithm = 'aes-256-cbc';
//       const key = process.env.ENCRYPTION_KEY;
//       const iv = Buffer.from(this.getDataValue('iv'), 'hex');
//       const encryptedData = Buffer.from(this.getDataValue('content'), 'hex');
//       const decipher = crypto.createDecipheriv(algorithm, key, iv);
//       let decrypted = decipher.update(encryptedData);
//       decrypted = Buffer.concat([decrypted, decipher.final()]);
//       return decrypted.toString();
//     },
//     set(value) {
//       const algorithm = 'aes-256-cbc';
//       const key = process.env.ENCRYPTION_KEY;
//       const iv = crypto.randomBytes(16);
//       const cipher = crypto.createCipheriv(algorithm, key, iv);
//       let encrypted = cipher.update(value);
//       encrypted = Buffer.concat([encrypted, cipher.final()]);
//       this.setDataValue('content', encrypted.toString('hex'));
//       this.setDataValue('iv', iv.toString('hex'));
//     }
//   },
//   sender: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   iv: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// }, { sequelize });

// module.exports = Message;
