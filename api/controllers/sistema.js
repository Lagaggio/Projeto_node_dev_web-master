const { restart } = require("nodemon");

module.exports = app => {

    const controller = {};
    controller.createSistema = function (req, res, next) {
        const nome = req.body.nome;
        
        app.db.none(`INSERT INTO public.sistema (nome) VALUES ('${nome}')`).then(data => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.status(200).json("System created!")
        }).catch(function (err){
            return next(err);
        });
        
    }

    controller.putSistema = function (req, res, next) {
      let {nome, id_sistema} = req.body  

        app.db.none(`UPDATE public.sistema SET nome = '${nome}' WHERE id_sistema = ${id_sistema}`).then(data => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.status(200).json("System successfully edited!")
        }).catch(function (err){
            return next(err);
        });
    }

    controller.deleteSistema = function (req, res, next) {
        const id = req.query.id;
  
        if(id) {
            app.db.any(`DELETE from public.sistema WHERE id_sistema = ${id}`).then(data => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
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
        const id = req.query.id;


        if(id) {
            app.db.any(`SELECT * from public.sistema WHERE id_sistema = ${id}`).then(data => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            app.db.any('SELECT * from public.sistema').then(data => {
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