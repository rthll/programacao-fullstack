import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import WantedPerson from '../models/WantedModel.js';

const router = express.Router();

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

export default router;