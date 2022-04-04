import joi from '@hapi/joi'


function WaterPropertiesValidation(data) {

    const schemaWaterPropertiesValidation = joi.object({
        company: joi.string()
        .required()
        .lowercase({ force: true }),
        period: joi.string()
        .required()
        .lowercase({ force: true })
        .valid('q1','q2','q3', 'q4'),
        temperature: joi.number()
            .min(0)
            .max(25)
        ,
        hardness: 
            joi.number()
            .min(1.1)
            .max(2)
        ,
        turbidity: 
            joi.number()
            .min(0)
            .max(4)
        ,
        nitrate:  joi.number()
                .min(0)
                .max(50)
        ,
        nitrite: joi.number()
                .min(0)
                .max(0.1)
        ,
        fluoride: joi.number()
                .min(0)
                .max(1.1)
        ,
        water_extraction_area: joi.string()
            .lowercase({ force: true })
            .valid('groundwater','surface water','dune water'),
        sulfate: joi.number()
                .min(0)
                .max(150)
        ,
        natrium: joi.number()
                .min(0)
                .max(150)
         ,
        chloride: joi.number()
                .min(0)
                .max(150)
        ,
    })

    return schemaWaterPropertiesValidation.validate(data);
}

export default WaterPropertiesValidation
