const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json());

// Rota principal
app.get('/', (req, res) => res.send('API OK'));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'API BeAgro funcionando',
    timestamp: new Date()
  });
});

// Login (POST)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'demo@beagro.com' && password === 'demo123') {
    res.json({
      token: 'abc123',
      user: { 
        id: '1',
        name: 'Demo User',
        email: 'demo@beagro.com'
      }
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Registro
app.post('/api/auth/register', (req, res) => {
  res.json({
    token: 'xyz789',
    user: { 
      id: '2',
      email: req.body.email,
      name: req.body.name
    }
  });
});

// Farms
app.get('/api/farms', (req, res) => {
  res.json([
    { 
      id: '1', 
      name: 'Fazenda Bela Vista', 
      areaHa: 1200,
      fields: [],
      seasons: []
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
