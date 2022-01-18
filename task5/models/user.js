const mongoose = require("mongoose");
const Joi = require("joi");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 50,
        required: true,
    },
    password: {
        type: String,
        min: 6,
        max: 12,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    isAdmin: {
        type:Boolean,
        default:false
    }
});

const User = mongoose.model("User", UserSchema);

const validationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(16).required(),
});

const validateUser = (user) => {
    return validationSchema.validate(user)
}

module.exports = { User, validateUser };