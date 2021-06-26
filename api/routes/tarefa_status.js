module.exports = app => {
    const controller = app.controllers.tarefa_status;
    app.route('/tarefa_status')
        .get(
            controller.getTarefa_status
        )
        .post(
            controller.createTarefa_status
        )
        .put(
            controller.putTarefa_status
        )
        .delete(
            controller.deleteTarefa_status
        )
}