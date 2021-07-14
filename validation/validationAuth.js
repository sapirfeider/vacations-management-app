const joi = require('joi');

const schema_login = joi.object({
    user_name: joi.string().required(),
    password: joi.string().required()
})

const schema_register = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    user_name: joi.string().required(),
    password: joi.string().required()
})




const validationsObj = {
    login: (req, res, next) => {
        const { error } = schema_login.validate(req.body)
        if (error) {
            return next(error.details)
        }
        return next()
    },
    register: (req, res, next) => {
        const { error } = schema_register.validate(req.body)
        if (error) {
            return next(error.details)
        }
        return next()
    }
}

function getValidationFunction(path) {
    return validationsObj[path]
}


module.exports = getValidationFunction