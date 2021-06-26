const { restart } = require("nodemon");

module.exports = app => {

    const controller = {};
    controller.createProjeto = function (req, res, next) {
        const titulo = req.body.titulo;
        const desc = req.body.descricao;
        const data_inicio = req.body.data_inicio;
        const data_fim = req.body.data_fim;
        const id_criador = req.body.id_criador;
        const id_sistema = req.body.id_sistema;
        
        app.db.none(`INSERT INTO public.projeto (titulo, descricao, data_inicio, data_fim, id_criador, created_at, id_sistema) 
        VALUES ('${titulo}', '${desc}', '${data_inicio}', '${data_fim}', ${id_criador}, CURRENT_TIMESTAMP, ${id_sistema});`).then(data => {
            res.status(200).json("Project created!")
        }).catch(function (err){
            return next(err);
        });
        
    }

    controller.putProjeto = function (req, res, next) {
        const titulo = req.body.titulo;
        const desc = req.body.descricao;
        const data_inicio = req.body.data_inicio;
        const data_fim = req.body.data_fim;
        const id_criador = req.body.id_criador;
        const id_sistema = req.body.id_sistema;
        const id = req.body.id;

        app.db.none(`UPDATE public.projeto SET titulo = '${titulo}', descricao = '${desc}', data_inicio = '${data_inicio}', data_fim = ${data_fim}, 
        id_criador = ${id_criador}, updated_at = CURRENT_TIMESTAMP, id_sistema = ${id_sistema} WHERE id = ${id}`).then(data => {
            res.status(200).json("Project successfully edited!")
        }).catch(function (err){
            return next(err);
        });
    }

    controller.deleteProjeto = function (req, res, next) {
        const id = req.body.id;

        if(id) {
            app.db.any(`DELETE from public.projeto WHERE id = ${id}`).then(data => {
                res.status(200).json("Project successfully removed!");
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            return res.status(500).json("Required ID!")
        }
    }

    controller.getProjeto = function(req, res, next) {
        const id = req.body.id;

        if(id) {
            app.db.any(`SELECT * from public.projeto WHERE id = ${id}`).then(data => {
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            app.db.any('SELECT * from public.projeto').then(data => {
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
            
        }
    }

    return controller;
}