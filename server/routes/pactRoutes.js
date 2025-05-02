import express from 'express';
import pactController from '../controllers/pactController.js';

const router = express.Router();

router.post('/', pactController.createPact);
router.get('/all', pactController.getAllPacts);
router.get('/user/:wallet_address', pactController.getPactsByWallet);
router.delete('/:id', pactController.deletePact);

export default router;
