module.exports = app => {
    const controller = app.controllers.tarefa_tipo;
    app.route('/tarefa_tipo')
        .get(
            controller.getTarefa_tipo
        )
        .post(
            controller.createTarefa_tipo
        )
        .put(
            controller.putTarefa_tipo
        )
        .delete(
            controller.deleteTarefa_tipo
        )
}