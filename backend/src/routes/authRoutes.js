import express from "express";
import UserModel from "../models/userModel.js";

const router = express.Router();

// Middleware de proteção
function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: "Não autorizado" });
  }
  next();
}

// Registro simples (opcional)
router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (UserModel.findByUsername(username)) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  const user = UserModel.createUser(username, password);
  res.json({ message: "Usuário criado", user });
});

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = UserModel.findByUsername(username);

  if (!user || user.password !== password) {
    return res.status(400).json({ error: "Credenciais inválidas" });
  }

  req.session.user = {
    id: user.id,
    username: user.username
  };

  res.json({
    message: "Login realizado",
    user: req.session.user
  });
});

// Logout
router.post("/logout", requireAuth, (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Sessão encerrada" });
  });
});

export default router;
