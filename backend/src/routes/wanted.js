import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import WantedPerson from '../models/wantedModel.js';

const router = express.Router();

// Criar nova pessoa procurada
router.post('/wanted', async (req, res) => {
  try {
    const data = req.body;

    const camposObrigatorios = ['title', 'description', 'details', 'image'];
    for (const campo of camposObrigatorios) {
      if (!data[campo]) {
        return res.status(400).json({ success: false, error: `Campo obrigatório ausente: ${campo}` });
      }
    }

    if (!data.uid) {
      data.uid = uuidv4();
    }

    const novoRegistro = await WantedPerson.create(data);
    res.status(201).json({ success: true, data: novoRegistro });
  } catch (err) {
    console.error('Erro ao salvar:', err);
    res.status(500).json({ success: false, error: 'Erro interno ao salvar os dados.' });
  }
});

// Buscar todas as pessoas procuradas
router.get('/search', async (req, res) => {
  try {
    const records = await WantedPerson.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    console.error("Erro ao buscar procurados:", error);
    res.status(500).json({ error: "Erro ao buscar procurados." });
  }
});

// Buscar uma pessoa específica pelo ID
router.get('/search/:id', async (req, res) => {
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