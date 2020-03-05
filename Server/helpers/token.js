const jwt = require(`jsonwebtoken`)

function createToken (userData) {
    return jwt.sign(userData, process.env.SECRET_TOKEN)
}

module.exports = createToken