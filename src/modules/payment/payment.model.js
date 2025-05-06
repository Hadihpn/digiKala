const { DataTypes } = require("sequelize")
const sequelize = require("../../config/sequelize.config")
const Payment = sequelize.define("payment",{
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    status:{type:DataTypes.BOOLEAN,defaultValue:false},
    amount:{type:DataTypes.DECIMAL},
    refId:{type:DataTypes.STRING,allowNull:true},
    authority:{type:DataTypes.INTEGER,allowNull:true},
    orderId:{type:DataTypes.INTEGER,allowNull:true},
},{
    modelName:"payment",
    timestamps:false,
    createdAt:"created_at",
    updatedAt:false
})
module.exports = {
    Payment
}