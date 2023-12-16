const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


// exports.signup = (req, res, next) => {
//     console.log(req.body);
//        console.log(req.body.password," ",req.body.login," ",req.body.nom);
//     bcrypt.hash(req.body.password, 10)
//         .then(hash => {
//         console.log(hash);
//       const u =  new user ({
//         login: req.body.login,
//           password_hash: hash,
//           nom: req.body.nom,
//           role : "user"
//       });
//             console.log(u, " 35");
//             console.log(u.id);
//             console.log(u.login);
//             console.log(u.password_hash);
//             console.log(u.nom);
//       u.save()
//         .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//         .catch(error => res.status(400).json({ error : error.message}));
//     })
//         .catch(error => {
//             console.error(error)
//             res.status(500).json({ error : error.message})
//         });
// };
exports.signup = (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                login: req.body.login,
                password_hash: hash,
                nom: req.body.nom,
                role: "user"
            })
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {
    console.log(req.body);
   User.findOne({ where: { login :  req.body.login } })
       .then(userLogged => {
           if (!userLogged) {
               return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
           }
             console.log(userLogged);
           bcrypt.compare(req.body.password, userLogged.password_hash)
               .then(valid => {
                   console.log(req.body.password);
                   if (!valid) {
                       return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                   }
                   console.log(req.body.password, "2");
                   console.log(userLogged.role);

                   res.status(200).json({
                       userId: userLogged.id,
                       userRole : userLogged.role,
                        token: jwt.sign(
                            {
                                userId: userLogged.id,
                                userRole: userLogged.role
                            },
                           'Shazam_ILSEN_CLA_23',
                           { expiresIn: '24h' }
                       )
                       
                       
                   });
                console.log("connexion réussie ");

               })
               .catch(error => res.status(500).json({ error }));
       })
       .catch(error => {
         
           console.log(error.message);
           res.status(500).json({ error })
       });
};

