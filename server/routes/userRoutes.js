import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/all', userController.getUsers);
router.get('/search', userController.searchUsers);
router.post('/check', userController.checkUser);
router.post('/create', userController.createUser);

export default router;
