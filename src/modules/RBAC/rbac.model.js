const {DataTypes} = require("sequelize");
const sequelize = require("../../config/sequelize.config");

const Role = sequelize.define("role", {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: true},
}, {timestamps: false, modelName: "role"});

module.exports = {
    Role
};