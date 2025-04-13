import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/all', userController.getUsers);
router.post('/create', userController.createUser);

export default router;
