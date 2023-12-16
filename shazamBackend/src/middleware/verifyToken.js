const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'Shazam_ILSEN_CLA_23');
       const userId = decodedToken.userId;
       const userRole = decodedToken.userRole;
          console.log(userRole);
       req.user_token = {
           userId: userId,
           userRole:userRole,
           
       };
       console.log(userRole);
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};

module.exports = verifyToken;
