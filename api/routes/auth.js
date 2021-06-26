module.exports = app => {
    const controller = app.controllers.auth;
    app.route('/auth')
        .post(
            controller.logUser
        )
}