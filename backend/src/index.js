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


const privateKey = fs.readFileSync(path.join(__dirname, 'crt', 'apache-selfsigned.key'), 'utf8');
const certificate = fs.readFileSync(path.join(__dirname, 'crt', 'apache-selfsigned.crt'), 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = 'mongodb://localhost:27017/fbi-wanted';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Erro ao conectar:', err));

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
app.use('/api/data', dataRoutes);
app.use('/api/data', wantedRoutes);

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT, () => {
  console.log(`🚀 Servidor HTTPS rodando na porta ${PORT}`);
});