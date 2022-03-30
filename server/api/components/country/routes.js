import express from 'express'
import countryValidation from '../../validation/countryValidation.js'
import Country from '../../../models/Country.js'
import verify from '../../middleware/verifyToken.js'
import logger from '../../../config/logger.js'

const router = express.Router();

router.param('id', function(req, res, next, id){
    Country.findById(id, function(err, result){
        if(err) {
            res.status(400).send(err)
            logger.error(err)
        }
        else {
            req.countryId = result;
            next();
        }
    });
}); 

router.get('/country', async (req, res) => {
    Country.find({}, function(err, countries){
        if(err){
            res.status(400).send(err)
            logger.error(err)
        }
        else {res.json(countries);}
    });
})

router.get('/country/:id', function(req, res){
    res.json({country: req.countryId});
});

router.post('/country', verify, async (req, res) => {

    const {error} = countryValidation(req.body)
    if(error) res.status(400).send(error.details[0].message);

    const countryrExist = await Country.findOne({name: req.body.name});
    if(countryrExist) return res.status(400).send("Country already exist");

    const country = new Country({
        name: req.body.name,
        longitude: req.body.longitude,
        latitude: req.body.latitude,
    });

    try{
        await country.save()
        res.send('Country is saved');

    } catch(err) {
        res.status(400).send(err)
        logger.error(err)
    }
  });

router.put('/country/:id', verify, async (req, res) => {

    const {error} = countryValidation(req.body)
    if(error) res.status(400).send(error.details[0].message);

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
            res.redirect('/country/'+req.params.id);
       }
    });
});

 router.delete('/country/:id', verify, async (req, res) => {
    Country.findByIdAndRemove({_id: req.params.id}, 
        function(err, countries){
        if(err){ 
            res.status(400).send(err);
            logger.error(err)
        }
        else { res.json(countries);}
    })
  });


export default router
