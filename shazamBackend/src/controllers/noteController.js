const { Note, Wine, User } = require('../models');

const noteController = {
    // Récupérer toutes les notes par Wine
    getNotesByWine:  (req, res,next) => {
        console.log(req.params.wineId,"je suis dans controller back");
        Note.findAll({
            where: { id_vin: req.params.wineId },
            include: [{
                model: Wine,
                as: 'wine'
            },
            { model: User, as: 'user'}],
        })
        .then(notes => {
            console.log(notes);
            res.json(notes);
        })
        .catch(error => {
                console.error("Erreur lors de la récupération des notes :", error);
                res.status(500).json({ error: error.message });
        });
    },

    

    // Récupérer toutes les notes par Utilisateur
    getNotesByUser: async (req, res) => {
        try {
            const notes = await Note.findAll({
                where: { id_user: req.params.userId },
                include: [User]
            });
            res.json(notes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

 
addNote: async (req, res) => {
    try {
        console.log(req.body);
        const valeur = req.body.valeur;
        const id_vin = req.body.id_vin;
        const id_user = req.user_token.userId; // ID de l'utilisateur récupéré du token JWT

        const note = await Note.create({
            valeur,
            id_vin,
            id_user
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
},


    // Mettre à jour une note
    updateNote: async (req, res) => {

        if (req.user_token.userId  !== Note.id_user && req.user_token.userRole !== 'admin') {
                return res.status(403).json({ message: 'Action non autorisée' });
            }

           Note.update(req.body,{where: { id :  req.params.id }}).then(()=> {
                 res.json(Note);
            })
                .catch(err => {
                    res.status(500).json({ error: err.message });

            })
           
        
    },

    // Supprimer une note
    deleteNote: async (req, res) => {
        try {
           if (req.user_token.userId  !== Note.id_user && req.user_token.userRole !== 'admin') {
                return res.status(403).json({ message: 'Action non autorisée' });
            }

            Note.destroy({ where: { id: req.params.id } }).then(() => {
                            res.status(200).json({ message: 'note supprimé' });

            })
                .catch(err => {
                            res.status(500).json({ error: err.message });

            })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = noteController;
