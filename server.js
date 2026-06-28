console.log(" Server starting...");

require("dotenv").config();

const app = require("./app");
const pool = require("./db/pool");

const PORT = process.env.PORT || 5000;

pool.connect()
    .then(() => {
        console.log(" Database Connected");
        app.listen(PORT, () => {
            console.log(` Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error(" Database Error:", err);
    });