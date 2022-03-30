import joi from '@hapi/joi'


function countryValidation(data) {

    const schemaCountryValidation = joi.object({
        name: joi.string()
        .min(6)
        .required(),
        longitude: joi.number()
        .min(6)
        .required(),
        latitude: joi.number()
        .min(6)
        .required(),
    })

    return schemaCountryValidation.validate(data);
}

export default countryValidation
