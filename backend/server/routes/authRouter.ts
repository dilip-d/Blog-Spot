import express from 'express'
import authController from '../controllers/authController'
const router = express.Router()
import { validRegister } from '../middleware/valid';

router.post('/register',validRegister, authController.register)
router.post('/active', authController.activeAccount)
router.post('/login', authController.login)
router.get('/logout', authController.logout)
router.get('/refresh_token', authController.refreshToken)
router.post('/google_login', authController.googleLogin)
router.post('/facebook_login', authController.facebookLogin)



export default router;