import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import compression from 'compression';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from "./config/logger.js";
import sessionConfig from './config/session.js';
import authRoutes from './routes/authRoutes.js';
import dataRoutes from './routes/dataRoutes.js';
import wantedRoutes from './routes/wantedRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//certificado e uso HTTPS
const privateKey = fs.readFileSync(path.join(__dirname, 'crt', 'apache-selfsigned.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'crt', 'apache-selfsigned.crt'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

//Config de pool
const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = 'mongodb://localhost:27017/fbi-wanted';

// --- CONFIGURAÇÃO DO POOL DE CONEXÕES ---
const mongooseOptions = {
  maxPoolSize: 10, // Define o limite máximo de 10 conexões abertas simultaneamente
  minPoolSize: 2,  // Mantém pelo menos 2 conexões sempre prontas 
  serverSelectionTimeoutMS: 5000, // Timeout de 5s para desistir se o banco estiver fora
  socketTimeoutMS: 45000, // Fecha conexões inativas por 45s para poupar recursos
};

// Passamos as opções como segundo parâmetro aqui
mongoose.connect(MONGO_URI, mongooseOptions)
  .then(() => console.log('MongoDB conectado com sucesso (Pool Ativado)'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

//compressão de arquivos e mensagens do server
app.use(compression());
app.use(cors({
  origin: ["http://localhost:5173", "https://localhost:5173"],
  credentials: true
}));
app.use(express.json());


app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://localhost:5173"],
      styleSrc: ["'self'", "https://localhost:5173"],
      imgSrc: ["'self'", "data:", "https://localhost:5173"],
      fontSrc: ["'self'"],
      connectSrc: ["'self'", "https://localhost:5173"],
      objectSrc: ["'none'"],
      frameSrc: ["'self'"],
    },
  })
);

app.use((req, res, next) => {

  logger.info(`Requisição: ${req.method} ${req.url} - IP: ${req.ip}`);

  if (req.body) req.body = mongoSanitize.sanitize(req.body);

  if (req.query) {
    const cleanQuery = mongoSanitize.sanitize(req.query);
    Object.assign(req.query, cleanQuery);
  }

  if (req.params) {
    const cleanParams = mongoSanitize.sanitize(req.params);
    Object.assign(req.params, cleanParams);
  }

  next();
});


app.use(sessionConfig);

app.use('/api/auth', authRoutes);
app.use('/api/data', wantedRoutes);

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT, () => {
  console.log(`Servidor HTTPS rodando na porta ${PORT}`);
});