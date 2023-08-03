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
            console.log(tasks)
            res.json(tasks);
        }).catch(err=>console.log(err));
    }
}

module.exports = new UserController()