const { restart } = require("nodemon");

module.exports = app => {

    const controller = {};
    controller.createUsuario = function (req, res, next) {
        const nome = req.body.nome;
        
        app.db.none(`INSERT INTO public.usuario (nome) VALUES ('${nome}')`).then(data => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.status(200).json("User created!")
        }).catch(function (err){
            return next(err);
        });
        
    }

    controller.putUsuario = function (req, res, next) {
        let {id_usuario, novoNome}  = req.body;

        app.db.any(`UPDATE public.usuario SET nome = '${novoNome}' WHERE id_usuario = ${id_usuario}`).then(data => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.status(200).json("User successfully edited!")
        }).catch(function (err){
            return next(err);
        });
    }

    controller.deleteUsuario = function (req, res, next) {
        const id = req.query.id;

        if(id) {
            app.db.any(`DELETE from public.usuario WHERE id_usuario = ${id}`).then(data => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
                res.status(200).json("User successfully removed!");
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            return res.status(500).json("Required ID")
        }
    }

    controller.getUsuario = function(req, res, next) {
        const id = req.query.id;
        
        if(id) {
            app.db.any(`SELECT * from public.usuario WHERE id_usuario = ${id}`).then(data => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            app.db.any('SELECT * from public.usuario').then(data => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
            
        }
    }

    return controller;
}