var mysql = require('mysql');
const db=mysql.createPool({
    host:'localhost',
                     user:'root',
                     password:'123456',
                     port:3306,
                     database:'nk',
                     charset:'utf8'
})
module.exports=db;
