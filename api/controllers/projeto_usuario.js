const { restart } = require("nodemon");

module.exports = app => {

    const controller = {};
    controller.createProjeto_usuario = function (req, res, next) {
        const id_projeto = req.body.id_projeto;
        const id_usuario = req.body.id_usuario;
        
        app.db.none(`INSERT INTO public.projeto_usuario (id_projeto, id_usuario) VALUES (${id_projeto}, ${id_usuario})`).then(data => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.status(200).json("Connection created!")
        }).catch(function (err){
            return next(err);
        });
        
    }

    controller.putProjeto_usuario = function (req, res, next) {
        let {id_usuario, id_projeto, id} = req.body;
        
        app.db.none(`UPDATE public.projeto_usuario SET id_projeto = ${id_projeto}, id_usuario = ${id_usuario} WHERE id = ${id}`).then(data => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.status(200).json("Connection successfully edited!")
        }).catch(function (err){
            return next(err);
        });
    }

    controller.deleteProjeto_usuario = function (req, res, next) {
        const id = req.query.id;

        if(id) {
            app.db.any(`DELETE from public.projeto_usuario WHERE id = ${id}`).then(data => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
                res.status(200).json("Connection cuccessfully removed!");
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            return res.status(500).json("Required ID!")
        }
    }

    controller.getProjeto_usuario = function(req, res, next) {
        const id = req.query.id;

        if(id) {
            app.db.any(`SELECT * from public.projeto_usuario WHERE id = ${id}`).then(data => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            app.db.any('SELECT * from public.projeto_usuario').then(data => {
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