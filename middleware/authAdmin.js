const jwt = require('jsonwebtoken');
const { Admin } = require('../model');

function adminAuthMiddleware(req, res, next) {
    const adminToken = req.headers['admin-authorization'];

    if (!adminToken) {
        return res.status(401).json({ message: 'No token' })
    }

    jwt.verify(adminToken, process.env.SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'No user' })
        }

        const admin = await Admin.findOne({ where: { id: decoded.id } })
        
        req.admin = admin

        next()
    })
}

module.exports = adminAuthMiddleware
