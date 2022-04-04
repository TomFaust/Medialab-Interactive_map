import countryValidation from '../validation/countryValidation.js'
import logger from '../../config/logger.js'
import Country from '../../models/Country.js'

const getId = async function(req, res, next, id){
     Country.findById(id, function(err, result){
        if(err) {
            res.status(400).send(err)
            logger.error(err)
        }
        else {
            req.countryId = result;
            next();
        }
    }).populate("companies")
}; 

const getAllCountry = async function(req, res){
    Country.find({}, function(err, countries){
        if(err){
            res.status(400).send(err)
            logger.error(err)
        } else {res.json(countries);}
    }).populate("companies")
};

const getCountry = async function(req, res){
    res.json({country: req.countryId});
};

const updateCountry = async (req, res) => {

    const {errorValidation} = countryValidation(req.body)
    if(errorValidation) res.status(400).send(errorValidation.details[0].message);
    
    Country.findByIdAndUpdate({_id: req.params.id}, {
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    }, function(err, result){
        if(err) {
            res.status(400).send(err)
            logger.error(err)
        }
        else { 
            res.redirect(303, '/api/country/'+req.params.id);
       }
    });
}

const deleteCountry =  async (req, res) => {
    Country.findByIdAndRemove({_id: req.params.id}, 
        function(err, countries){
        if(err){ 
            res.status(400).send(err);
            logger.error(err)
        }
        else { res.json(countries);}
    })
  };


const postCountry =  async (req, res) => {
    const validated = await countryValidation(req.body)
    if(validated?.error) res.status(400).send(validated.error.details[0].message);

    const countryrExist = await Country.findOne({name: validated.value.name});
    if(countryrExist) return res.status(400).send("Country already exist");

    const country = new Country({
        name: validated.value.name,
        longitude: validated.value.longitude,
        latitude: validated.value.latitude,
    });

    try{
        await country.save()
        res.send('Country is saved');

    } catch(err) {
        res.status(400).send(err)
        logger.error(err)
    }
};




export default {
    deleteCountry,
    updateCountry,
    getCountry,
    getAllCountry,
    postCountry,
    getId
}
