import express from 'express';
import checkinController from '../controllers/checkinController.js';

const router = express.Router();

router.post('/', checkinController.createCheckin);
router.get('/today/:wallet_address/:pact_id', checkinController.getTodayCheckinStatus);
router.get('/pact/:pactId/last7', checkinController.getLast7DaysByPact);

export default router;
