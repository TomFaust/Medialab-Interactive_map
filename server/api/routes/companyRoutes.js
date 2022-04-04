import express from 'express'
import companyController from '../controller/companyController.js'
import verifyToken from '../middleware/verifyToken.js'
import waterRoute from './waterRoutes.js'
import verifyRole from '../middleware/verifyRole.js'

const router = express.Router();

router.use('/company/:id', waterRoute)

router.param("id", companyController.getId)   

router
    .route('/company').get(companyController.getAllCompany)

router
    .route('/company').post(verifyToken, verifyRole, companyController.postCompany)    

router
    .route('/company/:id')
    .get(companyController.getCompany)
    .put(verifyToken, verifyRole, companyController.updateCompany)
    .delete(verifyToken, verifyRole, companyController.deleteCompany)

export default router
