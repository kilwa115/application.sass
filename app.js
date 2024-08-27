const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(cors());
app.use(express.json());

// Update this line to use path.join for better cross-platform compatibility
const staticDir = path.join(__dirname, 'public'); // Use the correct directory

// Serve static files from the 'public' directory
app.use(express.static(staticDir));

const db = new sqlite3.Database('./myapp.db', (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données SQLite.');
    }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, user) => {
        if (err) {
            res.status(500).json({ message: "Erreur lors de la connexion." });
        } else if (user) {
            res.json({ message: "Connexion réussie!" });
        } else {
            res.status(401).json({ message: "Erreur lors de l'authentification." });
        }
    });
});

const PORT = 1988;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution à http://localhost:${PORT}`);
});
