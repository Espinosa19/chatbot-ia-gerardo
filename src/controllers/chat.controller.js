import { generateAIResponse } from '../services/ai.service.js';

export const chatWithAI = async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensaje requerido' });
  }

  try {
    const response = await generateAIResponse({
      userMessage: message,
      conversationHistory: history || [],
    });

    res.json({
      reply: response,
    });
  } catch (error) {
    console.error('❌ Error en Chat Controller:', error);
    res.status(500).json({
      error: 'Error al procesar el mensaje',
      details: error.message,
    });
  }
};
