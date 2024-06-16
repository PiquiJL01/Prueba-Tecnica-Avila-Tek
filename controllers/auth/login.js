const jwt = require('jsonwebtoken')
//const bcrypt = require('bcryptjs')
const { jwtSecret } = require('../../config/auth.config')
const User = require('../../models/user')

function login(req, res) {
    User.findOne({
        name: req.body.name
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: 'Usuario no encontrado' })
            }

            //bcrypt.compareSync(req.body.password, user.password)
            const passwordIsValid = req.body.password === user.password
            if (!passwordIsValid) {
                return res.status(401).send({ message: 'Contraseña invalida' })
            }

            const token = jwt.sign({ id: user.id }, jwtSecret, {
                expiresIn: 86400 // 24 horas
            })

            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                roles: user.roles,
                accessToken: token
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message })
        })
}

module.exports = login