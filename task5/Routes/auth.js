const jwt=require("jsonwebtoken")
const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const req = require("express/lib/request");
//const jwt = require("jsonwebtoken");

const validate = (auth) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    return schema.validate(auth)
}

const router = express.Router();

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(401).json({ message: "email is incorrect" });

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword) return res.status(401).json({ message: "password is incorrect" });
   
    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)
    res.json({ token })
})

module.exports = router