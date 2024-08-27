const { app, BrowserWindow } = require('electron');
const path = require('path');
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const server = express();
server.use(cors());
server.use(express.json());

const staticDir = path.join(__dirname, 'public');
server.use(express.static(staticDir));

const db = new sqlite3.Database('./myapp.db', (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données:', err);
    } else {
        console.log('Connecté à la base de données SQLite.');
    }
});

server.post('/login', (req, res) => {
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

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution à http://localhost:${PORT}`);
});

function createWindow () {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    mainWindow.loadURL(`http://localhost:${PORT}`); // Load the server URL
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
