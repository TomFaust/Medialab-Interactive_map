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
    });
};

const getWaterProperties = async function(req, res){
    res.json({company: req.companyId});
};

const updateWaterProperties = async (req, res) => {
    const {errorValidation} = PropertiesValidation(req.body)
    if(errorValidation) res.status(400).send(errorValidation.details[0].message);

    const company = await Company.findOne({name: req.body.company}).populate('waterProperties');
    if(!company) res.status(400).send("Company doesn't exist");

    const period = company?.waterProperties
    const periodExist = await period.find(element => element.period === req.body.period);
    if(periodExist) return res.status(400).send("Period already exist");

    Company.findByIdAndUpdate({_id: req.params.id}, {
        company: company.id,
        period: req.body.period,

    }, function(err, result){
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
    const {errorValidation} = PropertiesValidation(req.body)
    if(errorValidation) res.status(400).send(errorValidation.details[0].message);

    const company = await Company.findOne({name: req.body.company}).populate('waterProperties');
    if(!company) res.status(400).send("Company doesn't exist");

    const period = company?.waterProperties
    const periodExist = await period.find(element => element.period === req.body.period);
    if(periodExist) return res.status(400).send("Period already exist");

    const properties = new Properties({
        company: company.id,
        period: req.body.period,
    });

    try{
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
