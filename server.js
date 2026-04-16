import dotenv from 'dotenv';
import app from './src/app.js';

import simularConversaciones from './src/services/simularConversacion.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  // Ejecutar simulación de conversaciones al iniciar
  simularConversaciones().catch(e => console.error('Error en simulación:', e));
});
