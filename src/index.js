const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const db = require('./db');
const routes = require('./routes');

app.use(express.json());
app.use(express.json({extended:false}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers: Content-Type')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PACH,DELETE')
    app.use(cors())
    next()
})

app.use('/', routes);

app.listen(3333, ()=>{
console.log('SERVIDOR RODANDO')
});