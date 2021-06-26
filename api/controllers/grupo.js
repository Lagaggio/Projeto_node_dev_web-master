const { restart } = require("nodemon");

module.exports = app => {

    const controller = {};
    controller.createGrupo = function (req, res, next) {
        const desc = req.body.descricao;
        const id_projeto = req.body.id_projeto;
        
        app.db.none(`INSERT INTO public.grupo (id_projeto, descricao) VALUES (${id_projeto}, '${desc}')`).then(data => {
            res.status(200).json("Group created!")
        }).catch(function (err){
            return next(err);
        });
        
    }

    controller.putGrupo = function (req, res, next) {
        const desc = req.body.descricao;
        const id_projeto = req.body.id_projeto;
        const id = req.body.id;
        
        app.db.none(`UPDATE public.grupo SET id_projeto = ${id_projeto}, descricao = '${desc}' WHERE id = ${id}`).then(data => {
            res.status(200).json("Group successfully edited!")
        }).catch(function (err){
            return next(err);
        });
    }

    controller.deleteGrupo = function (req, res, next) {
        const id = req.body.id;

        if(id) {
            app.db.any(`DELETE from public.grupo WHERE id = ${id}`).then(data => {
                res.status(200).json("Group successfully removed!");
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            return res.status(500).json("Required ID")
        }
    }

    controller.getGrupo = function(req, res, next) {
        const id = req.body.id;

        if(id) {
            app.db.any(`SELECT * from public.grupo WHERE id = ${id}`).then(data => {
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            app.db.any('SELECT * from public.grupo').then(data => {
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
            
        }
    }

    return controller;
}