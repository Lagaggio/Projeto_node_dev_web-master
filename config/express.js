const express = require('express');
var cors = require('cors');
const config = require('config');
const consign = require('consign');
const pgp = require('pg-promise')({})

module.exports = () => {
    const app = express();
    app.use(cors());
    cn = {
        'host': 'devweb.chiqahlpkytu.sa-east-1.rds.amazonaws.com',
        'port': 5432,
        'database': 'postgres',
        'user': 'root',
        'password': '123456789'
    };
    const db = pgp(cn);
    app.set('port', process.env.PORT || config.get('server.port'));
    app.db = db;
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    consign({ cwd: 'api' })
        //      .then('data')
        .then('controllers')
        .then('routes')
        .into(app);
    return app;
}


