import React, { useState } from 'react';
import { TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const response = await fetch('https://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password: senha }),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      localStorage.setItem('auth', 'true');
      navigate('/home');
    } else {
      setErro(result.message || 'Erro no login');
    }
  } catch (error) {
    setErro('Erro ao conectar com o servidor.');
  }
};

  return (
    <>
      <TextField
        label="Usuário"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Senha"
        type="password"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
        sx={{ mt: 2 }}
      >
        Entrar
      </Button>
      {erro && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {erro}
        </Alert>
      )}
    </>
  );
};

export default LoginForm;