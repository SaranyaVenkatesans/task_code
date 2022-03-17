const mongoose = require("mongoose");

const db = "mongodb://localhost:27017/example";

mongoose.connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, result) => {
        if (err) {
            console.log("Database Connection Error", err);
        }
        else {
            console.log("Database Connected");
        }
    }
);
