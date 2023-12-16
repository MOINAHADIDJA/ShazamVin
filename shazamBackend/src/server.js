//require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const { sequelize } = require('./models'); // Assurez-vous que le chemin est correct
const cors = require('cors');

const app = express();
app.use(express.json()); // Middleware pour parser le JSON
app.use(cors());

// app.use((_, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// });

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


const userRoutes = require('./routes/user'); // Importer les routes utilisateur
const authRoutes = require('./routes/authRoute');
const wineRoutes = require('./routes/wine');
const commentRoutes = require('./routes/comment');
const noteRoutes = require('./routes/note');
app.use('/api/auth', authRoutes);
app.use('/api', userRoutes); // Utiliser les routes utilisateur avec le préfixe '/api'
app.use('/api', wineRoutes);
app.use('/api', commentRoutes);
app.use('/api', noteRoutes);
// Tester la connexion à la base de données et démarrer le serveur
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données réussie.');
        const PORT = process.env.PORT || 3000; // Définir le port
        app.listen(PORT, () => { // Démarrer le serveur
            console.log(`Serveur en écoute sur le port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });
