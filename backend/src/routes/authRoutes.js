import express from "express";
import { databaseMock } from "../config/databaseMock.js";
import rateLimit from "express-rate-limit";
import logger from "../config/logger.js";


const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: "Muitas tentativas de login. Tente novamente mais tarde."
});

router.post("/login", loginLimiter, (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    logger.warn(`Tentativa de login sem credenciais - IP: ${req.ip}`);
    return res.status(400).json({ error: "Usuário e senha são obrigatórios." });
  }

  const user = databaseMock.users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    logger.error(`Falha de login para usuário: ${username} - IP: ${req.ip}`);
    return res.status(401).json({ error: "Credenciais inválidas." });
  }

  logger.info(`Login bem-sucedido para usuário: ${username} - IP: ${req.ip}`);
  return res.json({ message: "Login realizado com sucesso!", user });
});


// Rota de registro
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios." });
  }

  const exists = databaseMock.users.some((u) => u.username === username);
  if (exists) {
    return res.status(400).json({ error: "Usuário já existe." });
  }

  const newUser = {
    id: databaseMock.users.length + 1,
    username,
    password,
  };

  databaseMock.users.push(newUser);
  return res.status(201).json({ message: "Usuário registrado!", user: newUser });
});

export default router;