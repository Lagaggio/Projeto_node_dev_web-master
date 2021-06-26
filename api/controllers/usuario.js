const { restart } = require("nodemon");

module.exports = app => {

    const controller = {};
    controller.createUsuario = function (req, res, next) {
        const nome = req.body.nome;
        
        app.db.none(`INSERT INTO public.usuario (nome) VALUES ('${nome}')`).then(data => {
            res.status(200).json("User created!")
        }).catch(function (err){
            return next(err);
        });
        
    }

    controller.putUsuario = function (req, res, next) {
        const nome = req.body.nome;
        const id = req.body.id;

        app.db.none(`UPDATE public.usuario SET nome = '${nome}' WHERE id_usuario = ${id}`).then(data => {
            res.status(200).json("User successfully edited!")
        }).catch(function (err){
            return next(err);
        });
    }

    controller.deleteUsuario = function (req, res, next) {
        const id = req.body.id;

        if(id) {
            app.db.any(`DELETE from public.usuario WHERE id_usuario = ${id}`).then(data => {
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
        const id = req.body.id;
        
        if(id) {
            app.db.any(`SELECT * from public.usuario WHERE id_usuario = ${id}`).then(data => {
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            app.db.any('SELECT * from public.usuario').then(data => {
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
            
        }
    }

    return controller;
}