import { Router } from 'express';
import { chatWithAI } from '../controllers/chat.controller.js';

const router = Router();

// API interna para pruebas
router.post('/', chatWithAI);

export default router;
