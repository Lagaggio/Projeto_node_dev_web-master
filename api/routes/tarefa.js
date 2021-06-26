module.exports = app => {
    const controller = app.controllers.tarefa;
    app.route('/tarefa')
        .get(
            controller.getTarefa
        )
        .post(
            controller.createTarefa
        )
        .put(
            controller.putTarefa
        )
        .delete(
            controller.deleteTarefa
        )
}