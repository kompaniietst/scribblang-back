const controller = require("../controllers/systemEntity.controller");
const { authJwt } = require("../middlewares");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/allsystementites",
        [authJwt.verifyToken],
        controller.allsystementites
    )

    app.post(
        "/api/systemEntity/create",
        [authJwt.verifyToken],
        controller.createSystemEntity
    );

    app.post(
        "/api/systemEntity/update/:id",
        [authJwt.verifyToken],
        controller.updateSystemEntity
    );

    app.get(
        "/api/systemEntity/:id",
        [authJwt.verifyToken],
        controller.getSystemEntity
    );

    app.delete(
        "/api/systemEntity/delete/:id",
        controller.deleteSystemEntity
    )
};