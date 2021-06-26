module.exports = app => {
    const controller = app.controllers.prioridade;
    app.route('/prioridade')
        .get(
            controller.getPrioridade
        )
        .post(
            controller.createPrioridade
        )
        .put(
            controller.putPrioridade
        )
        .delete(
            controller.deletePrioridade
        )
}