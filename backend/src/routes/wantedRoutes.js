import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import NodeCache from 'node-cache'; 
import WantedPerson from '../models/wantedModel.js';

const router = express.Router();

// 2. CONFIGURAR O CACHE
// stdTTL: Tempo de vida do cache em segundos (coloquei 300seg)
// checkperiod: De quanto em quanto tempo ele limpa dados expirados
const cache = new NodeCache({ stdTTL: 300, checkperiod: 320 });

// --- ROTA DE CRIAÇÃO (POST) ---
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

    // 3. INVALIDAÇÃO DE CACHE
    // Se acabamos de adicionar alguém, a lista antiga guardada no cache está desatualizada.
    // Precisamos apagá-la para que a próxima busca pegue os dados novos do banco.
    cache.del('all_wanted'); 
    
    res.status(201).json({ success: true, data: novoRegistro });
  } catch (err) {
    console.error('Erro ao salvar:', err);
    res.status(500).json({ success: false, error: 'Erro interno ao salvar os dados.' });
  }
});

// --- ROTA DE BUSCA GERAL (GET) ---
router.get('/search', async (req, res) => {
  try {
    // 4. VERIFICAÇÃO DE CACHE
    const cacheKey = 'all_wanted'; // Chave única para esta consulta
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      // CACHE HIT (Achou na memória)
      console.log('Recuperado do Cache'); // Apenas para debug
      return res.json(cachedData);
    }

    // CACHE MISS (Não achou, busca no banco)
    console.log('Buscando no MongoDB...');
    const records = await WantedPerson.find().sort({ createdAt: -1 });

    // 5. SALVAR NO CACHE
    // Salvamos o resultado para as próximas requisições
    cache.set(cacheKey, records);

    res.json(records);
  } catch (error) {
    console.error("Erro ao buscar procurados:", error);
    res.status(500).json({ error: "Erro ao buscar procurados." });
  }
});

// --- ROTA DE BUSCA POR ID (GET) ---
router.get('/search/:id', async (req, res) => {
  const { id } = req.params;
  const cacheKey = `wanted_${id}`; 

  try {
    // Verifica se esse perfil específico já está em cache
    const cachedPerson = cache.get(cacheKey);
    if (cachedPerson) {
        console.log(` Perfil ${id} recuperado do Cache`);
        return res.json(cachedPerson);
    }

    const person = await WantedPerson.findById(id);
    if (!person) {
      return res.status(404).json({ error: "Pessoa não encontrada." });
    }

    // Salva esse perfil específico no cache
    cache.set(cacheKey, person);

    res.json(person);
  } catch (error) {
    console.error("Erro ao buscar pessoa:", error);
    res.status(500).json({ error: "Erro ao buscar pessoa." });
  }
});

export default router;