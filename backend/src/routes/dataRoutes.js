import express from "express";
import WantedPerson from "../models/wantedModel.js";

const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session?.user) {
    return res.status(401).json({ error: "Não autorizado" });
  }
  next();
}

// Criar nova pessoa procurada
router.post("/wanted", async (req, res) => {
  console.log("Dados recebidos:", req.body);

  try {
    const newPerson = new WantedPerson(req.body);
    await newPerson.save();
    res.status(201).json({ message: "Pessoa procurada criada com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar:", error);
    res.status(500).json({ error: "Erro ao salvar no banco de dados." });
  }
});

// Buscar todas as pessoas procuradas
router.get("/search", async (req, res) => {
  try {
    const records = await WantedPerson.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    console.error("Erro ao buscar procurados:", error);
    res.status(500).json({ error: "Erro ao buscar procurados." });
  }
});

// Buscar uma pessoa específica pelo ID
router.get("/search/:id", async (req, res) => {
  try {
    const person = await WantedPerson.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ error: "Pessoa não encontrada." });
    }
    res.json(person);
  } catch (error) {
    console.error("Erro ao buscar pessoa:", error);
    res.status(500).json({ error: "Erro ao buscar pessoa." });
  }
});

export default router;