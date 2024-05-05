const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'db_angular'
});

conexion.connect((err)=>{
    if(err){
        console.log(err);
        return;
    }else{
        console.log('Conexion exitosa');
    }
});

module.exports = conexion;