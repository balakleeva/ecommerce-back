const jwt = require('jsonwebtoken');
const { Client } = require('../model');

function clientAuthMiddleware(req, res, next) {
  const userToken = req.headers['client-authorization'];

  if (!userToken) {
    return res.status(401).json({ message: 'No token' })
  }

  jwt.verify(userToken, process.env.SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'No user' })
    }

    const user = await Client.findOne({ where: { id: decoded.id } })

    console.log('here????????????????', user)
    req.user = user

    next()
  })
}

module.exports = clientAuthMiddleware
