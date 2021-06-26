module.exports = app => {
    const controller = app.controllers.projeto;
    app.route('/projeto')
        .get(
            controller.getProjeto
        )
        .post(
            controller.createProjeto
        )
        .put(
            controller.putProjeto
        )
        .delete(
            controller.deleteProjeto
        )
}