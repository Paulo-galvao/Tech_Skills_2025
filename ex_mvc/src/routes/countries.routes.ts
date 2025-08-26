import express from 'express';
import { create, index } from '../controllers/countries.controller';

const router = express.Router();

router.get('/', index);
router.post('/:name', create);


export default router;