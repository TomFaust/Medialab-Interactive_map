import express from 'express'
import countryController from '../controller/countryController.js'
import verifyLogin from '../middleware/verifyToken.js'
import verifyRole from '../middleware/verifyRole.js'

const router = express.Router();

router.param("id", countryController.getId)   

router
    .route('/country').get(countryController.getAllCountry)
  
router
    .route('/country').post(verifyLogin, verifyRole, countryController.postCountry)    
  
router
    .route('/country/:id')
    .get(countryController.getCountry)
    .put(verifyLogin, countryController.updateCountry)
    .delete(verifyLogin, countryController.deleteCountry)
  

export default router
