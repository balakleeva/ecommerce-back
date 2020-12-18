const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');

function adminAuthMiddleware(req, res, next) {
    const adminToken = req.headers.adminToken;

    if (!adminToken) {
        return res.status(401).json({ message: 'No token' })
    }

    jwt.verify(adminToken, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'No user' })
        }

        const admin = Admin.findOne({ id: decoded.id })

        req.admin = admin

        next()
    })
}

