const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {User} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJWT = (id, email, login, role) => {
    return jwt.sign(
        {id: id, email: email, login: login, role: role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

class UserController{
    async registration(req, res, next){
        const email = req.body.email
        const password = req.body.password
        const login = req.body.login
        const role = req.body.role || "USER"
        if (!email || !password || !login){
            return next(ApiError.badRequest('Ошибка корректности данных.'));
        }
        const candidate_email = await User.findOne({ where: { email: email } });
        if (candidate_email){
            return next(ApiError.badRequest('Пользователь с таким email уже создан.'))
        }
        const candidate_login = await User.findOne({ where: { login: login } })
        if (candidate_login){
            return next(ApiError.badRequest("Пользователь с таким email уже создан."))
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await User.create({email, login, password: hashPassword, role: role})
        const token  = generateJWT(user.id, user.email, user.login, user.role);
        return res.json(token)
    }

    async login(req, res, next){
        const email = req.body.email
        const password = req.body.password

        const user = await User.findOne({ where: { email: email } });
        if (!user){
            return next(ApiError.badRequest('Пользователь с таким email не найден.'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword){
            return next(ApiError.badRequest(('Неверный пароль')))
        }
        const token = generateJWT(user.id, user.email, user.login, user.role)
        return res.json(token)
    }

    async check(req, res, next){
        const token = generateJWT(req.user.id, req.user.email, req.user.login, req.user.role)

        return res.json(token)
    }
}

module.exports = new UserController()