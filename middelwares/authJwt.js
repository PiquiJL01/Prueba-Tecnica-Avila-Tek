const jwt = require('jsonwebtoken')


// Metodo creado para validar que la peticion sea crear usuarios
function isCreateUser(req) {
  return req.baseUrl === '/api/users' && req.method === 'POST'
}

function verifyToken(req, res, next) {
  let token = req.headers['x-access-token']

  // Se genero la intencion de crear usuarios sin token
  if (!token && !isCreateUser(req)) {
    return res.status(403).send({ message: 'No se proporciono un token de identificacion' })
  }

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err && !isCreateUser(req)) {
      return res.status(401).send({ message: 'No autorizado' })
    }

    // Se valida el id decodificado porque crear usuarios no require token
    req.userId = decoded.id ? decoded.id : undefined

    next()
  })
}

module.exports = verifyToken
