const jwt = require('jsonwebtoken');
const Client = require('../model/Client');

function clientAuthMiddleware(req, res, next) {
  const userToken = req.headers.userToken;

  if (!userToken) {
    return res.status(401).json({ message: 'No token' })
  }

  jwt.verify(userToken, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'No user' })
    }

    const user = Client.findOne({ id: decoded.id })

    req.user = user

    next()
  })
}
