import joi from '@hapi/joi'


export function registerValidation(data) {

    const schemaRegistationValidation = joi.object({
        name: joi.string()
        .min(6)
        .required(),
        email: joi.string()
        .min(6)
        .required()
        .lowercase({ force: true }),
        password: joi.string()
        .min(6)
        .required(),
    })

    return schemaRegistationValidation.validate(data);
}

export function loginValidation(data) {

    const schemaLoginValidation = joi.object({
        email: joi.string()
        .min(6)
        .required()
        .lowercase({ force: true }),
        password: joi.string()
        .min(6)
        .required(),
    })

    return schemaLoginValidation.validate(data);
}
