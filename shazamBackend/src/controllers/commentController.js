const { Comment, Wine, User } = require('../models');


const commentController = {
  getCommentsByWine: (req, res,next) => {
    console.log(req.params.wineId);

    Comment.findAll({
        where: { id_vin: req.params.wineId },
        include: [{
            model: Wine,
            as: 'wine'
        },
        { model: User, as: 'user' }],
       
    })
    .then(comments => {
        console.log(comments);
        res.json(comments);
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des commentaires :", error);
        res.status(500).json({ error: error.message });
    });
},


    // Récupérer tous les commentaires pour un utilisateur spécifique
    getCommentsByUser: async (req, res) => {
        try {
            const comments = await Comment.findAll({
                where: { id_user: req.params.userId },
                include: [User]
            });
            res.json(comments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

  
addComment: async (req, res) => {
    try {
        console.log(req.body);
        const texte = req.body.texte;
        const id_vin = req.body.id_vin;
        const id_user = req.user_token.userId; // ID de l'utilisateur récupéré du token JWT

        const commentaire = await Comment.create({
            texte,
            id_vin,
            id_user
        });

        res.status(201).json(commentaire);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
},


    // // Mettre à jour un commentaire
    // updateComment: async (req, res) => {
    //     try {
    //        // comment.findOne({ where: { id: req.params.id } });

    //         // if (!comment) {
    //         //     return res.status(404).json({ message: 'Commentaire non trouvé' });
    //         // }

    //         // Vérifier si l'utilisateur est l'auteur du commentaire ou un admin
            
    //         if (req.user_token.userId  !== comment.id_user && req.user_token.userRole !== 'admin') {
    //             return res.status(403).json({ message: 'Action non autorisée' });
    //         }

    //        comment.update(req.body,{where: { id :  req.params.id }}).then(()=> {
    //              res.json(comment);
    //         })
    //             .catch(err => {
    //                         res.status(500).json({ error: err.message });

    //         })
           
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // },
    
    updateComment: (req, res) => {
    Comment.findByPk(req.params.id)
    .then(foundComment => {
        if (!foundComment) {
            return res.status(404).json({ message: 'Commentaire non trouvé' });
        }
        if (req.user_token.userId !== foundComment.id_user && req.user_token.userRole !== 'admin') {
            return res.status(403).json({ message: 'Action non autorisée' });
        }
        return foundComment.update(req.body);
    })
    .then(updatedComment => {
        res.json(updatedComment);
    })
    .catch(err => {
        console.error("Erreur lors de la mise à jour du commentaire :", err);
        res.status(500).json({ error: err.message });
    });
},

    // // Supprimer un commentaire
    // deleteComment: async (req, res) => {
    //     try {
    //         // const comment = await comment.findByPk(req.params.id);

    //         // if (!comment) {
    //         //     return res.status(404).json({ message: 'Commentaire non trouvé' });
    //         // }

    //         // Vérifier si l'utilisateur est l'auteur du commentaire ou un admin
    //         if (req.user_token.userId  !== comment.id_user && req.user_token.userRole !== 'admin') {
    //             return res.status(403).json({ message: 'Action non autorisée' });
    //         }

    //         comment.destroy({ where: { id: req.params.id } }).then(() => {
    //                         res.status(200).json({ message: 'Commentaire supprimé' });

    //         })
    //             .catch(err => {
    //                         res.status(500).json({ error: err.message });

    //         })
    //     } catch (error) {
    //         res.status(500).json({ error: error.message });
    //     }
    // },
    deleteComment: (req, res) => {
    Comment.findByPk(req.params.id)
    .then(foundComment => {
        if (!foundComment) {
            return res.status(404).json({ message: 'Commentaire non trouvé' });
        }
        if (req.user_token.userId !== foundComment.id_user && req.user_token.userRole !== 'admin') {
            return res.status(403).json({ message: 'Action non autorisée' });
        }
        return foundComment.destroy();
    })
    .then(() => {
        res.status(200).json({ message: 'Commentaire supprimé' });
    })
    .catch(err => {
        console.error("Erreur lors de la suppression du commentaire :", err);
        res.status(500).json({ error: err.message });
    });
},



};

module.exports = commentController;
