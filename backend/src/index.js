import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import sessionConfig from './config/session.js';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import wantedRoutes from './routes/wantedRoutes.js'; 

const app = express();
const PORT = process.env.PORT || 3001;

const MONGO_URI = 'mongodb://localhost:27017/fbi-wanted';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado com sucesso'))
  .catch(err => console.error('❌ Erro ao conectar no MongoDB:', err));

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(sessionConfig);

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/data', wantedRoutes); 
// Inicialização
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});