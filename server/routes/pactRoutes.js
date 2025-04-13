import express from 'express';
import pactController from '../controllers/pactController.js';

const router = express.Router();

router.get('/all', pactController.getAllPacts);
router.get('/:user1_id/:user2_id', pactController.getPactByUserIds);
router.post('/create', pactController.createPact);

export default router;
