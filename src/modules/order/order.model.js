const { DataTypes } = require("sequelize")
const sequelize = require("../../config/sequelize.config")
const { OrderStatus } = require("../../common/order.const")
const Order = sequelize.define("order",{
    id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    paymerntId:{type:DataTypes.INTEGER,allowNull:true},
    status:{type:DataTypes.ENUM(...Object.values(OrderStatus)),defaultValue:OrderStatus.Pending},
    address:{type:DataTypes.TEXT}, 
    userId:{type:DataTypes.STRING,allowNull:true},
    refId:{type:DataTypes.STRING,allowNull:true},
    total_amount:{type:DataTypes.DECIMAL},
    discount_amount:{type:DataTypes.DECIMAL},
    final_amount:{type:DataTypes.DECIMAL},
},{
    modelName:"order",
    timestamps:true,
    createdAt:"created_at",
    updatedAt:false
})
module.exports = {
    Order
}