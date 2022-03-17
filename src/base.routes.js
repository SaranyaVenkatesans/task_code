const User = require("./routes/user.route");

module.exports = function (app) {
    app.use("/User", User);
};