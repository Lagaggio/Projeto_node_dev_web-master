module.exports = app => {
    const controller = app.controllers.sistema;
    app.route('/sistema')
        .get(
            controller.getSistema
        )
        .post(
            controller.createSistema
        )
        .put(
            controller.putSistema
        )
        .delete(
            controller.deleteSistema
        )
}