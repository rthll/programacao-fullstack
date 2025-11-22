import React, { useState } from 'react';
import { TextField, Button, Alert, MenuItem, Box } from '@mui/material';

const WantedForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    details: '',
    reward_text: '',
    warning_message: '',
    sex: '',
    race: '',
    nationality: '',
    image: '',
  });


  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const camposObrigatorios = ['title', 'description', 'details', 'image'];
    for (const campo of camposObrigatorios) {
      if (!form[campo]) {
        setErro(`O campo "${campo}" é obrigatório.`);
        setMensagem('');
        return;
      }
    }

   try {
  const response = await fetch('https://localhost:3001/api/data/wanted', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Erro na resposta:', errorData);
    alert('Erro ao inserir: ' + errorData.error);
    return;
  }

  const result = await response.json();
  console.log('✅ Inserido com sucesso:', result);
  alert('Pessoa procurada inserida com sucesso!');
} catch (err) {
  console.error('Erro na requisição:', err);
  alert('Erro de conexão com o servidor.');
}

  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto' }}>
      <TextField label="Título" name="title" value={form.title} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Descrição" name="description" value={form.description} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Detalhes" name="details" value={form.details} onChange={handleChange} multiline rows={4} fullWidth margin="normal" />
      <TextField label="Recompensa" name="reward_text" value={form.reward_text} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Alerta de Perigo" name="warning_message" value={form.warning_message} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Sexo" name="sex" value={form.sex} onChange={handleChange} select fullWidth margin="normal">
        <MenuItem value="Male">Masculino</MenuItem>
        <MenuItem value="Female">Feminino</MenuItem>
      </TextField>
      <TextField label="Raça" name="race" value={form.race} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="Nacionalidade" name="nationality" value={form.nationality} onChange={handleChange} fullWidth margin="normal" />
      <TextField label="URL da Imagem" name="image" value={form.image} onChange={handleChange} fullWidth margin="normal" />

      <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth sx={{ mt: 2 }}>
        SAVE
      </Button>

      {mensagem && <Alert severity="success" sx={{ mt: 2 }}>{mensagem}</Alert>}
      {erro && <Alert severity="error" sx={{ mt: 2 }}>{erro}</Alert>}
    </Box>
  );
};

export default WantedForm;