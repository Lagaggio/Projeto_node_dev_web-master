const { restart } = require("nodemon");

module.exports = app => {

    const controller = {};
    controller.createTarefa_tipo = function (req, res, next) {
        const desc = req.body.descricao;
        
        app.db.none(`INSERT INTO public.tarefa_tipo (descricao) VALUES ('${desc}')`).then(data => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.status(200).json("Type of task created!")
        }).catch(function (err){
            return next(err);
        });
        
    }

    controller.putTarefa_tipo = function (req, res, next) {
        let {descricao, id} = req.body
        
        app.db.none(`UPDATE public.tarefa_tipo SET descricao = '${descricao}' WHERE id = ${id}`).then(data => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.status(200).json("Type of task successfully edited!")
        }).catch(function (err){
            return next(err);
        });
    }

    controller.deleteTarefa_tipo = function (req, res, next) {
        if(req.query.id) {
            app.db.any(`DELETE from public.tarefa_tipo WHERE id = ${req.query.id}`).then(data => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
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
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            app.db.any('SELECT * from public.tarefa_tipo').then(data => {
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