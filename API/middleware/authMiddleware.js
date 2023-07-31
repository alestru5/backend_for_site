const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.methods === "OPTIONS"){
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if (!token){
            res.status(401).json("Пользователь не авторизован")
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch(e) {
        res.status(401).json("Пользователь не авторизован")
    }
}