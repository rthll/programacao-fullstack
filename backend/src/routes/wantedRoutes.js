import express from 'express';
import WantedPerson from '../models/wantedModel.js';
import validator from 'validator';

const router = express.Router();

router.post('/wanted', async (req, res) => {
  const {
    title, description, details,
    reward_text, warning_message,
    sex, race, nationality, image
  } = req.body;

  
  if (!title || !description || !details || !reward_text || !warning_message || !sex || !race || !nationality || !image) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  if (!validator.isURL(image)) {
    return res.status(400).json({ error: 'URL da imagem inválida.' });
  }

  try {
    const newPerson = new WantedPerson(req.body);
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (err) {
    console.error('Erro ao salvar:', err);
    res.status(500).json({ error: 'Erro interno ao salvar pessoa procurada.' });
  }
});


router.get('/wanted', async (req, res) => {
  try {
    const people = await WantedPerson.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar pessoas procuradas.' });
  }
});

export default router;