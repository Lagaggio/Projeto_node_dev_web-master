module.exports = app => {
    const controller = app.controllers.grupo;
    app.route('/grupo')
        .get(
            controller.getGrupo
        )
        .post(
            controller.createGrupo
        )
        .put(
            controller.putGrupo
        )
        .delete(
            controller.deleteGrupo
        )
}