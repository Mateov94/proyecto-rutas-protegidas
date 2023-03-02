const checkUserCredentials = require('./auth.controller')
const jwt = require('jsonwebtoken')
const config = require('../../config')

const postLogin = (req, res) => {
  const { email, password } = req.body

  if(email && password){
    checkUserCredentials(email, password)
    //? Si recibo email y password
      .then((data) => {
          if(data){
            const token = jwt.sign({
              id: data.id,
              email: data.email,
              role: data.role
            }, config.api.jwtSecret) //TODO debera ser una variable de entorno
            res.status(200).json({message: 'Correct Credentials', token})
          } else {
            res.status(401).json({
                message: 'Invalid Credentials'
              })
          }
      })
      .catch((err) => {
        res.status(400).json({message: err.message})
      })
  } else {
    //! No recibo email y password
    res.status(400).json({message: 'Missing Data', fields: {email: 'exaple@example.com', password: 'string'}})
  }
}

module.exports = postLogin

