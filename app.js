const express = require("express");

const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth.routes");

app.use(express.json());

app.use("/auth", authRoutes);

const authenticate = require("./middleware/auth.middleware");

app.get("/profile", authenticate, (req, res) => {
    res.json({
        message: "Welcome!",
        user: req.user
    });
});

const bookRoutes = require("./routes/book.routes");

app.use("/books", bookRoutes);

const borrowRoutes = require("./routes/borrow.routes");

app.use("/borrow", borrowRoutes);


module.exports = app;