import express from 'express'
import WaterPropertiesController from '../controller/waterPropertiesController.js'
import verify from '../middleware/verifyToken.js'

const router = express.Router();

router.param("id", WaterPropertiesController.getId)   

router
    .route('/water-properties').get(WaterPropertiesController.getAllWaterProperties)
  
router
    .route('/water-properties').post(verify, WaterPropertiesController.postWaterProperties)    
  
router
    .route('/water-properties/:id')
    .get(WaterPropertiesController.getWaterProperties)
    .put(verify, WaterPropertiesController.updateWaterProperties)
    .delete(verify, WaterPropertiesController.deleteWaterProperties) 


export default router
