import express from 'express'
import companyValidation from '../../validation/companyValidation.js'
import Company from '../../../models/Company.js'
import verify from '../../middleware/verifyToken.js'
import logger from '../../../config/logger.js'

const router = express.Router();

router.param('id', function(req, res, next, id){
    Company.findById(id, function(err, result){
        if(err) {
            res.status(400).send(err)
            logger.error(err)
        }
        else {
            req.companyId = result;
            next();
        }
    });
}); 

router.get('/company', async (req, res) => {
    Company.find({}, function(err, countries){
        if(err){
            res.status(400).send(err)
            logger.error(err)
        }
        else {res.json(countries);}
    });
})

router.get('/company/:id', function(req, res){
    res.json({company: req.countryId});
});

router.post('/company', verify, async (req, res) => {

    const {errorValidation} = companyValidation(req.body)
    if(errorValidation) res.status(400).send(errorValidation.details[0].message);

    const companyExist = await Company.findOne({name: req.body.name});
    if(companyExist) return res.status(400).send("Company already exist");

    const company = new Company({
        name: req.body.name,
        country: req.body.country,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    });

    try{
        await company.save()
        res.send('Company is saved');

    } catch(err) {
        res.status(400).send(err)
        logger.error(err)
    }
  });

router.put('/company/:id', verify, async (req, res) => {

    const {errorValidation} = companyValidation(req.body)
    if(errorValidation) res.status(400).send(errorValidation.details[0].message);

    Company.findByIdAndUpdate({_id: req.params.id}, {
        name: req.body.name,
        country: req.body.country,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    }, function(err, result){
        if(err) {
            res.status(400).send(err)
            logger.error(err)
        }
        else { 
            res.redirect('/company/'+req.params.id);
       }
    });
});

 router.delete('/company/:id', verify, async (req, res) => {
    Company.findByIdAndRemove({_id: req.params.id}, 
        function(err, countries){
        if(err){ 
            res.status(400).send(err);
            logger.error(err)
        }
        else { res.json(countries);}
    })
  });


export default router
