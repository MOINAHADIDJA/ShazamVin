const { Wine }  = require('../models');

const wineController = {
  // Ajouter un vin
  addWine: async (req, res,next) => {
    try {
      console.log(req.body);
      Wine.create(req.body).then(wine => {
        console.log(wine);
        res.status(201).json(wine);
      })
        .catch(err => {
          console.log(err);
          console.log(err.message);
          console.log(err.error.message);
      })
      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Obtenir tous les vins
  getAllWines: async (req, res, next) => {
    console.log(11111);
    try {
      console.log(12345);
      const wines = await Wine.findAll();
      console.log(wines);
      res.status(200).json(wines);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obtenir un vin par ID
  getWineById: async (req, res) => {
    try {
      const wine = await Wine.findOne({ where: { id: req.params.id } }).then(wine => {

        res.status(200).json(wine);
      })
        .catch(err => {
                res.status(404).json({ error: 'Vin non trouvé' });
      })
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Mettre à jour un vin
  // updateWine: async (req, res) => {
  //   console.log("dans update controller");
  //     console.log(req.body);
  //   try{
  //     if (!req.user_token.userRole === 'admin') {
  //             console.log("verification token");

  //           res.status(401).json({message: 'Non authorisé'});

  //     } else {
  //       console.log("on update");
  //       console.log(req.params.id);
  //           console.log(req.body);
  //           Wine.update({ id: req.params.id }, { ...req.body, id: req.params.id })
  //                      .then(() => { res.status(200).json({message: 'Vin modifié !'})})
  //                      .catch(error => res.status(400).json({ error }));
  //       }
  //     } catch(error ) {
  //          res.status(500).json({ error });
  //     }
  // },

  updateWine: async (req, res) => {
    try {
      console.log("dans update controller");
      const wineId = req.params.id;
      const wineData = req.body;
      console.log(req.user_token.userRole);
      console.log(req.body);
      console.log(req.params.id);

      // Vérification du rôle de l'utilisateur
      if (req.user_token.userRole !== 'admin') {
        return res.status(401).json({ message: 'Non autorisé' });
      }
        Wine.update(wineData, {where: { id :  req.params.id }}).then(() => {
                res.status(200).json({ message: 'Vin modifié !' });
              })
          .catch(err => {
                      res.status(500).json({ error: err.message });

              })

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },

  // Supprimer un vin
  // deleteWine:  (req, res) => {
  //   try {
  //                    console.log("vin qui va etre supprimé");

  //       if(!req.user_token.userRole ==='admin'){
  //           res.status(401).json({message: 'Non authorisé'});

  //       } else {
  //         console.log(req.params.id);
  //         wine.deleteOne({ where: { id: req.params.id } })
  //           .then(() => {
  //             console.log("vin supprimé");
  //             res.status(200).json({ message: 'Vin supprimé !' })
  //           })
  //                      .catch(error => res.status(401).json({ error }));
  //       }
  //    } catch (error) {
  //      console.log(error.message);
  //          res.status(500).json({ error });
  //     }

  // }

  deleteWine: (req, res) => {
    try {
        console.log("vin qui va etre supprimé");
        if (req.user_token.userRole !== 'admin') {
            res.status(401).json({ message: 'Non autorisé' });
        } else {
            console.log(req.params.id);
            Wine.destroy({ where: { id: req.params.id } })
                .then(() => {
                    console.log("vin supprimé");
                    res.status(200).json({ message: 'Vin supprimé !' })
                })
                .catch(error => res.status(500).json({ error }));
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error });
    }
},


  searchWines: (req, res) => {
    try {
      const { nomProducteur, millesime, region } = req.body; // Exemple de données reçues
      Wine.findAll({
        where: {
          nomProducteur: nomProducteur,
          millesime: millesime,
          regionOrigine: region
        }
      }).then((wines) => {
        if (wines.length === 0) {
          return res.status(404).json({ message: 'Aucun vin correspondant trouvé' });
        }
        res.json(wines);

      })
        .catch(err => res.status(500).json({message : err.message}));


  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur');
  }
}



 
};

module.exports = wineController;
