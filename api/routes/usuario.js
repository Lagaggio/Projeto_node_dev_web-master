module.exports = app => {
    const controller = app.controllers.usuario;
    app.route('/usuario')
        .get(
            controller.getUsuario
        )
        .post(
            controller.createUsuario
        )
        .put(
            controller.putUsuario
        )
        .delete(
            controller.deleteUsuario
        )
}