const { restart } = require("nodemon");

module.exports = app => {

    const controller = {};
    controller.createTarefa = function (req, res, next) {
        const titulo = req.body.titulo;
        const descricao = req.body.descricao;
        const id_projeto = req.body.id_projeto;
        const id_criador = req.body.id_criador;
        const id_dev = req.body.id_dev;
        const tempo_estimado = req.body.tempo_estimado;
        const data_inicio = req.body.data_inicio;
        const data_fim = req.body.data_fim;
        const id_pai_tarefa = req.body.id_pai_tarefa;
        const id_tipo_tarefa = req.body.id_tipo_tarefa;
        const id_status_tarefa = req.body.id_status_tarefa;
        const data_inicio_dev = req.body.data_inicio_dev;
        const data_fim_dev = req.body.data_fim_dev;
        const tempo_realizado = req.body.tempo_realizado;
        const authorized = req.body.authorized;
        const id_prioridade = req.body.id_prioridade;
        const complexidade = req.body.complexidade;
        const impacto = req.body.impacto;
        const id_grupo = req.body.id_grupo;
        
        app.db.none(`INSERT INTO public.tarefa (titulo, descricao, id_projeto, id_criador, id_dev, tempo_estimado, data_inicio, data_fim, id_pai_tarefa, id_tipo_tarefa, 
            id_status_tarefa, data_inicio_dev, data_fim_dev, created_at, tempo_realizado, authorized, id_prioridade, complexidade, impacto, id_grupo) 
            VALUES ('${titulo}', '${descricao}', ${id_projeto}, ${id_criador}, ${id_dev}, ${tempo_estimado}, '${data_inicio}', '${data_fim}', ${id_pai_tarefa}, 
            ${id_tipo_tarefa}, ${id_status_tarefa}, '${data_inicio_dev}', '${data_fim_dev}', CURRENT_TIMESTAMP, ${tempo_realizado}, ${authorized}, ${id_prioridade}, 
            ${complexidade}, ${impacto}, ${id_grupo});`).then(data => {
            res.status(200).json("Task created!")
        }).catch(function (err){
            return next(err);
        });
        
    }

    controller.putTarefa = function (req, res, next) {
        const id = req.body.id;
        const titulo = req.body.titulo;
        const descricao = req.body.descricao;
        const id_projeto = req.body.id_projeto;
        const id_criador = req.body.id_criador;
        const id_dev = req.body.id_dev;
        const tempo_estimado = req.body.tempo_estimado;
        const data_inicio = req.body.data_inicio;
        const data_fim = req.body.data_fim;
        const id_pai_tarefa = req.body.id_pai_tarefa;
        const id_tipo_tarefa = req.body.id_tipo_tarefa;
        const id_status_tarefa = req.body.id_status_tarefa;
        const data_inicio_dev = req.body.data_inicio_dev;
        const data_fim_dev = req.body.data_fim_dev;
        const tempo_realizado = req.body.tempo_realizado;
        const authorized = req.body.authorized;
        const id_prioridade = req.body.id_prioridade;
        const complexidade = req.body.complexidade;
        const impacto = req.body.impacto;
        const id_grupo = req.body.id_grupo;

        app.db.none(`UPDATE public.tarefa SET titulo = '${titulo}', descricao = '${descricao}', id_projeto = ${id_projeto}, id_criador = ${id_criador}, id_dev = ${id_dev}, 
        tempo_estimado = ${tempo_estimado}, data_inicio = '${data_inicio}', data_fim = '${data_fim}', id_pai_tarefa = ${id_pai_tarefa}, id_tipo_tarefa = ${id_tipo_tarefa}, 
        id_status_tarefa = ${id_status_tarefa}, data_inicio_dev = '${data_inicio_dev}', data_fim_dev = '${data_fim_dev}', updated_at = CURRENT_TIMESTAMP, 
        tempo_realizado = ${tempo_realizado}, authorized = ${authorized}, id_prioridade = ${id_prioridade}, complexidade = ${complexidade}, impacto = ${impacto}, 
        id_grupo = '${id_grupo}' WHERE id = ${id}`).then(data => {
            res.status(200).json("Task successfully edited!")
        }).catch(function (err){
            return next(err);
        });
    }

    controller.deleteTarefa = function (req, res, next) {
        const id = req.body.id;

        if(id) {
            app.db.any(`DELETE from public.tarefa WHERE id = ${id}`).then(data => {
                res.status(200).json("Task successfully removed");
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            return res.status(500).json("Required ID")
        }
    }

    controller.getTarefa = function(req, res, next) {
        const id = req.body.id;

        if(id) {
            app.db.any(`SELECT * from public.tarefa WHERE id = ${id}`).then(data => {
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
        }
        else {
            app.db.any('SELECT * from public.tarefa').then(data => {
                res.status(200).json(data);
            }).catch(function (err) {
                return next(err);
            });
            
        }
    }

    return controller;
}