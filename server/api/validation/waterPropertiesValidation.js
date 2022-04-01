import joi from '@hapi/joi'


function WaterPropertiesValidation(data) {

    const schemaWaterPropertiesValidation = joi.object({
        company: joi.string()
        .required(),
        period: joi.string()
        .required()
        .valid('Q1','Q2','Q3', 'Q4'),
        temperature: [{
            value: joi.number()
            .min(0)
            .max(25)
        }],
        hardness: [{
            value: joi.number()
            .min(1.1)
            .max(2)
        }],
        turbidity: [{
            value: joi.number()
            .min(0)
            .max(4)
        }],
        health: [{
            nitrate: [{
                value: joi.number()
                .min(0)
                .max(50)
            }],
            nitrite: [{
                value: joi.number()
                .min(0)
                .max(0.1)
            }],
            fluoride: [{
                value: joi.number()
                .min(0)
                .max(1.1)
            }],
        }],
        taste: [{
            water_extraction_area: joi.string()
            .valid('Groundwater','Surface water','Dune water'),
            sulfate: [{
                value: joi.number()
                .min(0)
                .max(150)
            }],
            natrium: [{
                value: joi.number()
                .min(0)
                .max(150)
            }],
            chloride: [{
                value: joi.number()
                .min(0)
                .max(150)
            }],
        }],
    })

    return schemaWaterPropertiesValidation.validate(data);
}

export default WaterPropertiesValidation