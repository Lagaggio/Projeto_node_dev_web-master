const { restart } = require("nodemon");

module.exports = app => {

    const controller = {};
    controller.createTarefa_tipo = function (req, res, next) {
        const desc = req.body.descricao;
        
        app.db.none(`INSERT INTO public.tarefa_tipo (descricao) VALUES ('${desc}')`).then(data => {
            res.status(200).json("Type of task created!")
        }).catch(function (err){
            return next(err);
        });
        
    }

    controller.putTarefa_tipo = function (req, res, next) {
        
        app.db.none(`UPDATE public.tarefa_tipo SET descricao = '${req.body.descricao}' WHERE id = ${req.query.id}`).then(data => {
            res.status(200).json("Type of task successfully edited!")
        }).catch(function (err){
            return next(err);
        });
    }

    controller.deleteTarefa_tipo = function (req, res, next) {
        if(req.query.id) {
            app.db.any(`DELETE from public.tarefa_tipo WHERE id = ${req.query.id}`).then(data => {
                res.status(200).json("Type of task successfully removed!");
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            return res.status(500).json("Required ID")
        }
    }

    controller.getTarefa_tipo = function(req, res, next) {
        if(req.query.id) {
            app.db.any(`SELECT * from public.tarefa_tipo WHERE id = ${req.query.id}`).then(data => {
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            app.db.any('SELECT * from public.tarefa_tipo').then(data => {
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
            
        }
    }

    return controller;
}