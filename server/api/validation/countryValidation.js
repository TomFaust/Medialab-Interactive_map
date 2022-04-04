import joi from '@hapi/joi'


function countryValidation(data) {

    const schemaCountryValidation = joi.object({
        name: joi.string()
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

    return schemaCountryValidation.validate(data, {"convert": true} );
}

export default countryValidation
