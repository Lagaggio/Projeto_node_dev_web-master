module.exports = app => {
    const controller = app.controllers.projeto_usuario;
    app.route('/projeto_usuario')
        .get(
            controller.getProjeto_usuario
        )
        .post(
            controller.createProjeto_usuario
        )
        .put(
            controller.putProjeto_usuario
        )
        .delete(
            controller.deleteProjeto_usuario
        )
}