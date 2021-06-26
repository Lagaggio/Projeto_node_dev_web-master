const { restart } = require("nodemon");

module.exports = app => {

    const controller = {};
    controller.createSistema = function (req, res, next) {
        const desc = req.body.descricao;
        
        app.db.none(`INSERT INTO public.sistema (descricao) VALUES ('${desc}')`).then(data => {
            res.status(200).json("System created!")
        }).catch(function (err){
            return next(err);
        });
        
    }

    controller.putSistema = function (req, res, next) {
        
        app.db.none(`UPDATE public.sistema SET descricao = '${req.body.descricao}' WHERE id = ${req.query.id}`).then(data => {
            res.status(200).json("System successfully edited!")
        }).catch(function (err){
            return next(err);
        });
    }

    controller.deleteSistema = function (req, res, next) {
        if(req.query.id) {
            app.db.any(`DELETE from public.sistema WHERE id = ${req.query.id}`).then(data => {
                res.status(200).json("System successfully removed!");
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            return res.status(500).json("Required ID")
        }
    }

    controller.getSistema = function(req, res, next) {
        if(req.query.id) {
            app.db.any(`SELECT * from public.sistema WHERE id = ${req.query.id}`).then(data => {
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            app.db.any('SELECT * from public.sistema').then(data => {
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
            
        }
    }

    return controller;
}