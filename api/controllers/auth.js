const { restart } = require("nodemon");
const jwt = require('jsonwebtoken');
const SECRET = "iqwrhtewhpethpretgreçhgterihttestesecretbrabo";

module.exports = app => {

    const controller = {};
    
    controller.logUser = function (req, res) {
        if (req.body.user === 'bola' && req.body.senha_usuario === '123456789') {
            const token = jwt.sign({userID: 1}, SECRET, { expiresIn: 1200 })
            return res.json({ auth: true, token });
        }
        
        res.status(401).end();

    }

    // controller.logOut = function (req, res, next) {
    //     const senha_usuario = req.body.senha_usuario;

    //     if (req.body.senha_usuario === '123456789') {
    //         jwt.sign({userID: 1}, SECRET, { expiresIn: 1200 })
    //         return res.json({ auth: true, token });   
    //     }

    //     res.status(401).end();

    // }

    return controller;
}