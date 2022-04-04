import PropertiesValidation from '../validation/waterPropertiesValidation.js'
import logger from '../../config/logger.js'
import Company from '../../models/Company.js'
import Properties from '../../models/WaterProperties.js'

const getId = async function(req, res, next, id){
    Properties.findById(id, function(err, result){
        if(err) {
            res.status(400).send(err)
            logger.error(err)
        }
        else {
            req.companyId = result;
            next();
        }
    });
}; 

const getAllWaterProperties = async function(req, res){
    Properties.find({}, function(err, countries){
        if(err){
            res.status(400).send(err)
            logger.error(err)
        }
        else {res.json(countries);}
    }).populate('company', "name");
};

const getWaterProperties = async function(req, res){
    res.json({company: req.companyId});
};

const updateWaterProperties = async (req, res) => {
    const validated = await PropertiesValidation(req.body)
    if(validated?.error) res.status(400).send(validated.error.details[0].message);

    const company = await Company.findOne({name: req.body.company}).populate('waterProperties');
    // if(!company) res.status(400).send("Company doesn't exist");

    const data = validated.value

    const period = company?.waterProperties
    const periodExist = await period.find(element => element.period === req.body.period);
    if(!periodExist) return res.status(400).send("Period doesn't exist");

    Company.findByIdAndUpdate({_id: req.params.id}, {
        company: company.id,
        period: data.period,
        temperature: {value: data.temperature},
        hardness:  {value: data.hardness},
        turbidity: {value: data.turbidity},
        health: {
            nitrate:  {value: data.nitrate},
            nitrite:  {value: data.nitrite},
            fluoride: {value: data.fluoride},
        },
        taste: {
            water_extraction_area: data.water_extraction_area,
            sulfate: {value: data.sulfate},
            natrium: {value: data.natrium},
            chloride: {value: data.chloride},
        },
    }, 
    function(err, result){
        if(err) {
            res.status(400).send(err)
            logger.error(err)
        }
        else { 
            res.redirect(303, '/api/water-properties/'+req.params.id);
       }
    });
}

const deleteWaterProperties =  async (req, res) => {
    Company.findByIdAndRemove({_id: req.params.id}, 
        function(err, countries){
        if(err){ 
            res.status(400).send(err);
            logger.error(err)
        }
        else { res.json(countries);}
    })
  };


const postWaterProperties =  async (req, res) => {
    const validated = await PropertiesValidation(req.body)
    if(validated?.error) res.status(400).send(validated.error.details[0].message);

    const data = validated.value

    const company = await Company.findOne({name: validated.value.company}).populate('waterProperties');
    if(!company) res.status(400).send("Company doesn't exist");

    const properties = new Properties({
        company: company.id,
        period: data.period,
        temperature: {value: data.temperature},
        hardness:  {value: data.hardness},
        turbidity: {value: data.turbidity},
        health: {
            nitrate:  {value: data.nitrate},
            nitrite:  {value: data.nitrite},
            fluoride: {value: data.fluoride},
        },
        taste: {
            water_extraction_area: data.water_extraction_area,
            sulfate: {value: data.sulfate},
            natrium: {value: data.natrium},
            chloride: {value: data.chloride},
        },
    });

    try{
        const period = company?.waterProperties
        const periodExist = await period.find(element => element.period === validated.value.period);
        if(periodExist) return res.status(400).send("Period already exist");
        await properties.save()
        Company.findByIdAndUpdate({_id: company.id},
            { $push: { waterProperties: properties.id }}, function(err, result){    
        })
        res.send('Water properties is saved');

    } catch(err) {
        res.status(400).send(err)
        logger.error(err)
    }
};

export default {
    deleteWaterProperties,
    updateWaterProperties,
    getWaterProperties,
    getAllWaterProperties,
    postWaterProperties,
    getId
}
