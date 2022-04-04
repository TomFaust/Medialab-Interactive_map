import express from 'express'
import authController from '../controller/authController.js';

const router = express.Router();

router
    .route('/register').post(authController.postRegister)
  
router
    .route('/login').post(authController.postLogin)    

export default router
