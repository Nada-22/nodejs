require("dotenv").config(".env");
const mongoose = require("mongoose");
const express = require("express");
const userRouter = require("./Routes/user");
const userauth = require("./Routes/auth");
const { logger } = require("./middleware");

const app = express();
console.log(process.env.DB_URL)


//Middleware
app.use(express.json()); 
app.use(logger);

app.use("/users", userRouter);
app.use("/auth",userauth)
app.use((err, req, res, next) => {

    // server logs
    res.status(500).json({ message: err.message })
})


mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        app.listen(3000, () => {
            console.log("server running on port 3000");
        });
        console.log("successfully connected with the database")
    })
    .catch(() => {
        console.log("error connecting to mongodb");
    });
   