import express from 'express'
import countryController from '../controller/countryController.js'
import verify from '../middleware/verifyToken.js'

const router = express.Router();

router.param("id", countryController.getId)   

router
    .route('/country').get(countryController.getAllCountry)
  
router
    .route('/country').post(verify, countryController.postCountry)    
  
router
    .route('/country/:id')
    .get(countryController.getCountry)
    .put(verify, countryController.updateCountry)
    .delete(verify, countryController.deleteCountry)
  

export default router
