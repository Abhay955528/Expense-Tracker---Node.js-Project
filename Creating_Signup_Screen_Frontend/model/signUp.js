const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const sign = sequelize.define('signUp',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        unique:true
    },
    password:Sequelize.INTEGER
    
})

module.exports = sign;