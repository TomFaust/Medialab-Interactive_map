import joi from '@hapi/joi'


function WaterPropertiesValidation(data) {

    const schemaWaterPropertiesValidation = joi.object({
        company: joi.string()
        .required(),
        period: joi.string()
        .required(),
    })

    return schemaWaterPropertiesValidation.validate(data);
}

export default WaterPropertiesValidation
