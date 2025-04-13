import express from 'express';
import gymController from '../controllers/gymController.js';

const router = express.Router();

router.get('/all', gymController.getGyms);
router.post('/create', gymController.createGym);

export default router;
