const joi = require('joi');

const schema_following_params = joi.object({
    user_id: joi.number().required(),
    vacation_id: joi.number().required()
})

const schema_vacationDetails = joi.object({
    description: joi.string().required(),
    destination: joi.string().required(),
    image: joi.string().optional,
    check_in_date: joi.date().required(),
    check_out_date: joi.date().required(),
    price: joi.number().required()
})


const validationsObj = {
    followingParams: (req, res, next) => {
        const { error } = schema_following_params.validate(req.body)
        if (error) {
            return next(error.details)
        }
        return next()
    },
    vacationDetails: (req, res, next) => {
        const { error } = schema_vacationDetails.validate(req.body)
        if (error) {
            return next(error.details)
        }
        return next()
    }
    // },
    // followingStatus: (req, res, next) => {
    //     const { error } = schema_following_status.validate(req.body)
    //     if (error) {
    //         return next(error.details)
    //     }
    //     return next()
    // }
}

function ValidationActions(path) {
    return validationsObj[path]
}


module.exports = ValidationActions