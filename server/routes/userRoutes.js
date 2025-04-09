import userController from '../controllers/userController.js';
import express from 'express';
const router = express.Router();

router.route('/')
	.get(userController.getUsers)
	.post(userController.addUser);

export default router;
