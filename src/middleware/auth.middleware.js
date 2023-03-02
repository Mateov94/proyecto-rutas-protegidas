//? Proteger rutas para que solo usuarios con login activo puedan hacer peticiones
//? Desencriptar el token y agregarlo a req.user

const passport = require('passport')
const config = require('../../config')

const JwtStrategy = require('passport-jwt').Strategy
const ExtraJwt = require('passport-jwt').ExtractJwt

const { findAllUsers } = require("../users/users.controllers")

const option = {
  jwtFromRequest : ExtraJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey : config.api.jwtSecret //TODO debera ser una variable de entorno
}

passport.use(
  new JwtStrategy(option, async (tokenDecoded, done) => {
    try {
      const user = findAllUsers(tokenDecoded.id)
      if(user){
        return done(null, tokenDecoded)
      } else {
        return done (null, false)
      }
    } catch (error) {
      return done(error, false)
    }
  })
)

module.exports = passport