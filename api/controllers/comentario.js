const { restart } = require("nodemon");

module.exports = app => {

    const controller = {};
    controller.createComentario = function (req, res, next) {
        const id_usuario = req.body.id_usuario;
        const id_tarefa = req.body.id_tarefa;
        const desc = req.body.descricao;
        const id_pai_comentario = req.body.id_pai_comentario;
        

        app.db.none(`INSERT INTO public.comentario (id_usuario, id_tarefa, descricao, created_at, id_pai_comentario) 
        VALUES (${id_usuario}, ${id_tarefa}, '${desc}', CURRENT_TIMESTAMP, ${id_pai_comentario})`).then(data => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.status(200).json("Commented!")
        }).catch(function (err) {
            return next(err);
        });

    }

    controller.putComentario = function (req, res, next) {
        let { id, id_usuario, id_tarefa, novadesc, id_pai_comentario}   = req.body;

        app.db.none(`UPDATE public.comentario SET id_usuario = ${id_usuario}, id_tarefa = ${id_tarefa}, descricao = '${novadesc}', updated_at = CURRENT_TIMESTAMP, 
        id_pai_comentario = ${id_pai_comentario} WHERE id = ${id}`).then(data => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            res.status(200).json("Comment successfully edited!")
        }).catch(function (err) {
            return next(err);
        });
    }

    controller.deleteComentario = function (req, res, next) {
        const id = req.query.id;

        if (id) {
            app.db.any(`DELETE from public.comentario WHERE id = ${id}`).then(data => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
                res.status(200).json("Comment successfully removed!");
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            return res.status(500).json("Required ID.")
        }
    }

    controller.getComentario = function (req, res, next) {
        const id = req.query.id;

        if (id) {
            app.db.any(`SELECT * from public.comentario WHERE id = ${id}`).then(data => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            app.db.any('SELECT * from public.comentario').then(data => {
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