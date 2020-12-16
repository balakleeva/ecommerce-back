const { User } = require('../model');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    const user = await User.findAll({});

    if (req.body.password === user.password) {
        jwt.sign({ id: user.id }, process.env.JWT_SECRET, (err, token) => {
            if (err) {
                return res.status(400).json({ data: 'sorry' })
            }

            res.status(200).json({ data: token });
        })
    } else {
        res.status(404).json({ data: 'error ):' });
    }
}

async function registration(req, res) {
    const { name, email, password } = req.body;

    const genre = await User.create({ name, email, password });

    res.status(200).json({ data: genre });
}

module.exports = {
    login,
    registration,
}
