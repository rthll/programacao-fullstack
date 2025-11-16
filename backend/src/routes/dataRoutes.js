import express from "express";
import DataModel from "../models/dataModel.js";

const router = express.Router();

// Middleware reutilizado
function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: "Não autorizado" });
  }
  next();
}

// Inserir dado
router.post("/insert", requireAuth, (req, res) => {
  const { value } = req.body;

  const record = DataModel.insert(req.session.user.id, value);

  res.json({ message: "Dado inserido", record });
});

// Buscar dados do usuário
router.get("/search", requireAuth, (req, res) => {
  const records = DataModel.findByUser(req.session.user.id);
  res.json(records);
});

export default router;
