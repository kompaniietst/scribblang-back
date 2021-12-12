const { verifySignUp } = require("../middlewares");
// const controller = require("../controllers/word.controller");
const controller = require("../controllers/word.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/allwords",
        controller.allWords
    )

    app.post(
        "/api/word/save",
        // [
        //     verifySignUp.checkDuplicateUsernameOrEmail,
        //     verifySignUp.checkRolesExisted
        // ],
        controller.save
    );

    // app.post("/api/auth/signin", controller.signin);
};