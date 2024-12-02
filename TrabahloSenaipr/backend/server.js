// server.js
const express = require('express');
const db = require('./db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(express.json());
const port = 4000;

app.use(cors({
  origin: '*',
}));

// Função para gerar token JWT
const generateToken = (user) => {
  return jwt.sign({ userId: user.id, role: user.role }, 'SECRET_KEY', { expiresIn: '1h' });
};

// Rota para registro de usuário
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
    if (err) {
      console.error('Erro ao registrar usuário:', err);
      return res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  });
});

// Rota de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const token = generateToken(user);
    res.json({ token });
  });
});

// Middleware para verificar o JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido ou expirado' });
  }
};

// Rota para cadastrar um navio
app.post('/ships', authMiddleware, (req, res) => {
  const { nome_navio, tipo, imo_number, size, cargo_capacity } = req.body;
  const ownerId = req.user.userId;
  db.query(
    'INSERT INTO ships (nome_navio, imo_number, tipo, size, cargo_capacity, owner_id) VALUES (?, ?, ?, ?, ?, ?)',
    [nome_navio, imo_number, tipo, size, cargo_capacity, ownerId],
    (err, result) => {
      if (err) {
        console.error('Erro ao cadastrar navio:', err);
        return res.status(500).json({ message: 'Erro ao cadastrar navio' });
      }
      res.status(201).json({ message: 'Navio cadastrado com sucesso' });
    }
  );
});

// Rota para visualizar os navios do usuário logado ou todos os navios se for admin
app.get('/ships', authMiddleware, (req, res) => {
  const { role, userId } = req.user;

  if (role === 'admin') {
    db.query('SELECT * FROM ships', (err, results) => {
      if (err) {
        console.error('Erro ao obter navios:', err);
        return res.status(500).json({ message: 'Erro ao obter navios' });
      }
      res.json(results);
    });
  } else {
    db.query('SELECT * FROM ships WHERE owner_id = ?', [userId], (err, results) => {
      if (err) {
        console.error('Erro ao obter navios do usuário:', err);
        return res.status(500).json({ message: 'Erro ao obter navios do usuário' });
      }
      res.json(results);
    });
  }
});

// Rota para atualizar um navio
app.put('/ships/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const { name, type } = req.body;

  db.query('UPDATE ships SET name = ?, type = ? WHERE id = ?', [name, type, id], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar navio:', err);
      return res.status(500).json({ message: 'Erro ao atualizar navio' });
    }
    res.json({ message: 'Navio atualizado com sucesso' });
  });
});

// Rota para remover um navio
app.delete('/ships/:id', authMiddleware, (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM ships WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao deletar navio:', err);
      return res.status(500).json({ message: 'Erro ao deletar navio' });
    }
    res.json({ message: 'Navio removido com sucesso' });
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`API do porto ouvindo na porta ${port}`);
});
