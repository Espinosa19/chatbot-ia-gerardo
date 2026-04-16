import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import chatRoutes from './routes/chat.routes.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.use('/chat', chatRoutes);


export default app;
