const {Task, User} = require('../models/models')

class UserController{
    async create(req, res){
        const title = req.body.title
        const body = req.body.body
        const score = req.body.score
        const answer = req.body.answer
        const task = await Task.create({title: title, body: body, score: score, answer: answer})
        return res.json(task)
    }
    async list(req, res, next){
        Task.findAll().then(tasks=>{
            res.json(tasks);
        }).catch(err=>console.log(err));
    }
    async complete(req, res) {
        const score = req.body.score
        const tmp = await User.findOne({where: {id: req.body.id}})
        await User.update({score: tmp.dataValues.score + score},{where: {id: req.body.id}})
        console.log(tmp.dataValues.score, req.body.id)
    }
}

module.exports = new UserController()