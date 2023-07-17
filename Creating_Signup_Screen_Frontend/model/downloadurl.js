const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const downloadFileUrl = sequelize.define('downloadfileurl',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    downloadUrl:Sequelize.STRING
})

module.exports = {
    downloadFileUrl
}