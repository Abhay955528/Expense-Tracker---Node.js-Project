const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const ForgetPassword = sequelize.define('forgetpassword',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    active:Sequelize.BOOLEAN,
}) 

module.exports = ForgetPassword;