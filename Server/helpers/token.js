const jwt = require(`jsonwebtoken`)

function createToken (userData) {
    return jwt.sign(userData, process.env.SECRET_TOKEN || '12345' )
}

module.exports = createToken