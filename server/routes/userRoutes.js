import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/check', userController.checkUser);
router.get('/all', userController.getUsers);
router.post('/create', userController.createUser);

export default router;
