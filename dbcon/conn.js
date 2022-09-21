const {Sequelize ,Datatypes }=require('sequelize');
const config = require('../config/config')
// const mssql=require('mssql');

const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = config;


const sequelize= new Sequelize(DB_NAME,DB_USER,DB_PASS,{
    host: DB_HOST,
  dialect: 'mssql',
  dialectOptions: {
    // Observe the need for this nested `options` field for MSSQL
    options: {
      // tedious options here
      useUTC: false,
      dateFirst: 1,
      encrypt: false
    }
  }
});


module.exports=sequelize;

