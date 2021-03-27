/* const jwt = require('express-jwt');

const authorizationMiddleware = jwt({
    secret: process.env.SECRET,
    algorithms: ['HS256']
});

module.exports = authorizationMiddleware;
*/

const jwt = require('jsonwebtoken');

const authorizationMiddleware = (request, response, next) => {
  // On récupère le token à partir des headers
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
  // S'il n'y a pas de token, on renvoie une erreur
    if (token == null) return response.status(401).json({
      error: "Absence de jeton d'authentification"
    })
  // Si le token n'est pas valide, on renvoie une erreur
    jwt.verify(token, process.env.TOKEN_SECRET, (err, member) => {
      if (err) {
        response.status(401).json({
          error: "Jeton d'authentification invalide"
        })
      } else {
        // Si tout est OK, on ajoute le payload pour la requête
        request.member = member
        next()
      }
    })
}

module.exports = authorizationMiddleware;