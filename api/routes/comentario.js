module.exports = app => {
    const controller = app.controllers.comentario;
    app.route('/comentario')
        .get(
            controller.getComentario
        )
        .post(
            controller.createComentario
        )
        .put(
            controller.putComentario
        )
        .delete(
            controller.deleteComentario
        )
}