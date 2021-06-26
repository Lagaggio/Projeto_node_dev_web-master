const { restart } = require("nodemon");

module.exports = app => {

    const controller = {};
    controller.createTarefa_status = function (req, res, next) {
        const desc = req.body.descricao;
        
        app.db.none(`INSERT INTO public.tarefa_status (descricao) VALUES ('${desc}')`).then(data => {
            res.status(200).json("Task status created!")
        }).catch(function (err){
            return next(err);
        });
        
    }

    controller.putTarefa_status = function (req, res, next) {
        
        app.db.none(`UPDATE public.tarefa_status SET descricao = '${req.body.descricao}' WHERE id = ${req.query.id}`).then(data => {
            res.status(200).json("Task status successfully edited!")
        }).catch(function (err){
            return next(err);
        });
    }

    controller.deleteTarefa_status = function (req, res, next) {
        if(req.query.id) {
            app.db.any(`DELETE from public.tarefa_status WHERE id = ${req.query.id}`).then(data => {
                res.status(200).json("Task status successfully removed!");
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            return res.status(500).json("Required ID!")
        }
    }

    controller.getTarefa_status = function(req, res, next) {
        if(req.query.id) {
            app.db.any(`SELECT * from public.tarefa_status WHERE id = ${req.query.id}`).then(data => {
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            app.db.any('SELECT * from public.tarefa_status').then(data => {
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
            
        }
    }

    return controller;
}