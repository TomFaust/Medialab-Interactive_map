import express from 'express'
import countryValidation from '../../validation/countryValidation.js'
import Country from '../../../models/Country.js'
import verify from '../../middleware/verifyToken.js'

const router = express.Router();


router.get('/country', async (req, res) => {
    console.log('country data')
    Country.find({}, function(err, countries){
        if(err){
            console.log(err);
        }
        else {
            res.json(countries);
        }
    });
})

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
    }
  });


export default router
