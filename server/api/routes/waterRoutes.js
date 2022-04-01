import express from 'express'
import WaterPropertiesController from '../controller/waterPropertiesController.js'
import verify from '../middleware/verifyToken.js'

const router = express.Router();

router.param("id", WaterPropertiesController.getId)   

router
    .route('/country').get(WaterPropertiesController.getAllWaterProperties)
  
router
    .route('/country').post(verify, WaterPropertiesController.postWaterProperties)    
  
router
    .route('/country/:id')
    .get(WaterPropertiesController.getWaterProperties)
    .put(verify, WaterPropertiesController.updateWaterProperties)
    .delete(verify, WaterPropertiesController.deleteWaterProperties) 


export default router
