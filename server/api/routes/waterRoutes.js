import express from 'express'
import WaterPropertiesController from '../controller/waterPropertiesController.js'
import verifyToken from '../middleware/verifyToken.js'
import verifyRole from '../middleware/verifyRole.js'

const router = express.Router();

router.param("id", WaterPropertiesController.getId)   

router
    .route('/water-properties').get(WaterPropertiesController.getAllWaterProperties)
  
router
    .route('/water-properties').post(verifyToken, verifyRole, WaterPropertiesController.postWaterProperties)    
  
router
    .route('/water-properties/:id')
    .get(WaterPropertiesController.getWaterProperties)
    .put(verifyToken, verifyRole, WaterPropertiesController.updateWaterProperties)
    .delete(verifyToken, verifyRole, WaterPropertiesController.deleteWaterProperties) 


export default router
