const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('./userModel')(sequelize, DataTypes);
db.groups = require('./groupModel')(sequelize, DataTypes);
db.groupUsers = require('./m2mGroupUserModel')(sequelize, DataTypes);
module.exports = db;