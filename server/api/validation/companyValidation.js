import joi from '@hapi/joi'


function companyValidation(data) {

    const schemaCompanyValidation = joi.object({
        name: joi.string()
        .min(6)
        .required()
        .lowercase({ force: true }),
        country: joi.string()
        .min(6)
        .lowercase({ force: true })
        .required(),
        longitude: joi.number()
        .min(6)
        .required(),
        latitude: joi.number()
        .min(6)
        .required(),
    })

    return schemaCompanyValidation.validate(data);
}

export default companyValidation
