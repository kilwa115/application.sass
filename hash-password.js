const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./myapp.db');

const username = 'admin'; // Remplacez par le nom d'utilisateur désiré
const password = 'admin123'; // Remplacez par le mot de passe désiré

bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash], (err) => {
        if (err) {
            console.error('Erreur lors de l\'insertion de l\'utilisateur:', err);
        } else {
            console.log('Utilisateur inséré avec succès.');
        }
        db.close();
    });
});
