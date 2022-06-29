const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({err:"Authentication invalid"})
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.admin = { amdinId: payload.id, name: payload.name}
    next()
  } catch (error) {
    return res.status(401).json({err:"Authentication invalid"})
  }
}

module.exports = authAdmin
