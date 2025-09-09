const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.use(express.json());

app.get('/', (req, res) => res.send('API OK'));

app.post('/api/auth/login', (req, res) => {
  if (req.body.email === 'demo@beagro.com') {
    res.json({
      token: 'abc123',
      user: { name: 'Demo' }
    });
  } else {
    res.status(401).json({ error: 'Invalid' });
  }
});

app.listen(3001, () => console.log('API rodando na porta 3001'));
