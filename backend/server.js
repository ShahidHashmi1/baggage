const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sql = require('mssql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// SQL Server Configuration
const dbConfig = {
  user: 'your_username',
  password: 'your_password',
  server: 'your_server', // e.g., localhost or Azure SQL server address
  database: 'your_database',
  options: {
    encrypt: true, // Use if connecting to Azure
    trustServerCertificate: true, // For local dev
  },
};

// Connect to SQL Server
sql.connect(dbConfig).then(() => {
  console.log('Connected to SQL Server');
}).catch((err) => {
  console.error('Database connection failed:', err);
});

// API Routes
app.post('/profiles', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await sql.query`INSERT INTO Profiles (Name) OUTPUT INSERTED.ID VALUES (${name})`;
    res.status(201).send(result.recordset[0]);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/profiles/:id/clubs', async (req, res) => {
  const { id } = req.params;
  const { name, distance } = req.body;
  try {
    await sql.query`INSERT INTO Clubs (ProfileId, Name, Distance) VALUES (${id}, ${name}, ${distance})`;
    res.status(201).send({ message: 'Club added' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/profiles', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM Profiles`;
    res.status(200).send(result.recordset);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/profiles/:id/clubs', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await sql.query`SELECT * FROM Clubs WHERE ProfileId = ${id}`;
    res.status(200).send(result.recordset);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
