import companyValidation from '../validation/companyValidation.js'
import logger from '../../config/logger.js'
import Company from '../../models/Company.js'
import Country from '../../models/Country.js'

const getId = async function(req, res, next, id){
    Company.findById(id, function(err, result){
        if(err) {
            res.status(400).send(err)
            logger.error(err)
        }
        else {
            req.companyId = result;
            next();
        }
    }).populate('waterProperties')
}; 

const getAllCompany = async function(req, res){
    await Company.find({}, function(err, countries){
        if(err){
            res.status(400).send(err)
            logger.error(err)
        }
        else {res.json(countries);}
    }).populate("waterProperties")
};

const getCompany = async function(req, res){
    res.json({company: req.companyId});
};

const updateCompany = async (req, res) => {
    const validated = await companyValidation(req.body)
    if(validated?.error) res.status(400).send(validated.error.details[0].message);

    const companyExist = await Company.findOne({name: req.body.name});
    if(companyExist) return res.status(400).send("Company already exist");

    const country = await Country.findOne({name: req.body.country});
    if(!country) res.status(400).send("Country doesn't exist");

    Company.findByIdAndUpdate({_id: req.params.id}, {
        name: validated.value.name,
        country: country.id,
        longitude: validated.value.longitude,
        latitude: validated.value.latitude,
    }, function(err, result){
        if(err) {
            res.status(400).send(err)
            logger.error(err)
        }
        else { 
            res.redirect(303, '/api/company/'+req.params.id);
       }
    });
}

const deleteCompany =  async (req, res) => {
    Company.findByIdAndRemove({_id: req.params.id}, 
        function(err, countries){
        if(err){ 
            res.status(400).send(err);
            logger.error(err);
        }
        else {res.json(countries);}
    })
  };


const postCompany =  async (req, res) => {
    const {errorValidation} = companyValidation(req.body)
    if(errorValidation) res.status(400).send(errorValidation.details[0].message);

    const companyExist = await Company.findOne({name: req.body.name});
    if(companyExist) return res.status(400).send("Company already exist");

    const country = await Country.findOne({name: req.body.country});
    if(!country) res.status(400).send("Country doesn't exist");

    const company = new Company({
        name: req.body.name,
        country: country.id,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    });

    try{
        await company.save()
        Country.findByIdAndUpdate({_id: country.id},
            { $push: { companies: company.id }}, function(err, result){     
        })
        res.send('Company is saved');

    } catch(err) {
        res.status(400).send(err)
        logger.error(err)
    }
};




export default {
    deleteCompany,
    updateCompany,
    getCompany,
    getAllCompany,
    postCompany,
    getId
}
