const { restart } = require("nodemon");

module.exports = app => {

    const controller = {};
    controller.createPrioridade = function (req, res, next) {
        const desc = req.body.descricao;
        
        app.db.none(`INSERT INTO public.prioridade (descricao) VALUES ('${desc}')`).then(data => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.status(200).json("Priority created!")
        }).catch(function (err){
            return next(err);
        });
        
    }

    controller.putPrioridade = function (req, res, next) {
        let { id, novadesc } = req.body;
        
        app.db.none(`UPDATE public.prioridade SET descricao = '${novadesc}' WHERE id = ${id}`).then(data => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.status(200).json("Priority successfully edited!")
        }).catch(function (err){
            return next(err);
        });
    }

    controller.deletePrioridade = function (req, res, next) {
        const id = req.query.id;

        if(req.query.id) {
            app.db.any(`DELETE from public.prioridade WHERE id = ${id}`).then(data => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
                res.status(200).json("Priority successfully removed!");
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            return res.status(500).json("Required ID")
        }
    }

    controller.getPrioridade = function(req, res, next) {
        if(req.query.id) {
            app.db.any(`SELECT * from public.prioridade WHERE id = ${req.query.id}`).then(data => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            app.db.any('SELECT * from public.prioridade').then(data => {
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