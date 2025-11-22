import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import compression from 'compression';
import sessionConfig from './config/session.js';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import wantedRoutes from './routes/wantedRoutes.js'; 
import fs from 'fs';
import https from 'https'; // <--- IMPORTANTE: NÃO ESQUEÇA DE IMPORTAR

import path from 'path';
import { fileURLToPath } from 'url';

// Configuração de caminhos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leitura dos Certificados (com path.join para evitar erros)
const privateKey = fs.readFileSync(path.join(__dirname, 'crt', 'apache-selfsigned.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'crt', 'apache-selfsigned.crt'), 'utf8');
const credentials = { key: privateKey, cert: certificate }; // <--- OBJETO NECESSÁRIO PARA O HTTPS

const app = express();
const PORT = process.env.PORT || 3001;

const MONGO_URI = 'mongodb://localhost:27017';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado com sucesso'))
  .catch(err => console.error('❌ Erro ao conectar no MongoDB:', err));

// Middlewares
app.use(compression());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(sessionConfig);

// Arquivos estáticos
app.use('/static', express.static(path.join(__dirname, '../../frontend/public')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/data', wantedRoutes); 

// --- A MUDANÇA ACONTECE AQUI ---

// Criamos o servidor HTTPS explicitamente
const httpsServer = https.createServer(credentials, app);

// Iniciamos o servidor HTTPS
httpsServer.listen(PORT, () => {
  console.log(`🚀 Servidor HTTPS rodando na porta ${PORT}`);
});