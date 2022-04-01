import joi from '@hapi/joi'


function companyValidation(data) {

    const schemaCompanyValidation = joi.object({
        name: joi.string()
        .min(6)
        .required(),
        country: joi.string()
        .min(6)
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
