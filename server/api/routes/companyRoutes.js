import express from 'express'
import companyController from '../controller/companyController.js'
import verify from '../middleware/verifyToken.js'

const router = express.Router();

router.param("id", companyController.getId)   

router
    .route('/company').get(companyController.getAllCompany)

router
    .route('/company').post(verify, companyController.postCompany)    

router
    .route('/company/:id')
    .get(companyController.getCompany)
    .put(verify, companyController.updateCompany)
    .delete(verify, companyController.deleteCompany)

export default router
