const {Sequelize , DataTypes } = require('sequelize')
const sequelize = require("../dbcon/conn");


const User = sequelize.define(
    'user',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true,
        },
        fname : {
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        lname : {
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        email : {
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING(250),
            allowNull:false,
        }
    },
    {
        freezTableName :true,
        tableName : 'user',
        timestamps : true
    }
)

module.exports=User;