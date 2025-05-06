import express from 'express';
import checkinController from '../controllers/checkinController.js';

const router = express.Router();

router.post('/', checkinController.createCheckin);
router.get('/today/:wallet_address/:pact_id', checkinController.hasCheckedInToday);
router.get('/pact/:pact_id/last7', checkinController.getLast7DaysByPact);

export default router;
