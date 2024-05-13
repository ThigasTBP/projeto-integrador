const mysql = require ('mysql')

const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'tormenta'
});

db.connect((err)=>{ 
    if (err) {
        console.error('erro ao conectar ao banco de dados', err);
    } else {
        console.log('conectado ao banco de dados');
    }
});

module.exports = db;