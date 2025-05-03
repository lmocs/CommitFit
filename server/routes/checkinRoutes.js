import express from 'express';
import checkinController from '../controllers/checkinController.js';

const router = express.Router();

router.post('/', checkinController.createCheckin);

export default router;
