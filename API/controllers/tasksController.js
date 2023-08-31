const {Task, User, Complete_Task} = require('../models/models')

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
            return res.json(tasks);
        }).catch(err=>console.log(err));
    }
    async list_complete_task(req, res, next){
        const ans = []
        Complete_Task.findAll(
            {where: {user_id: req.query.user_id}}
        ).then(tasks=> {
            return res.json(tasks)
        })

    }
    async complete_score(req, res) {
        const score = req.body.score
        const tmp = await User.findOne({where: {id: req.body.id}})
        await User.update({score: tmp.dataValues.score + score},{where: {id: req.body.id}})
        return res.json(tmp)
    }
    async complete_task(req, res) {
        const user_id = req.body.user_id
        const task_id = req.body.task_id
        const complete_task = await Complete_Task.create({user_id: user_id, task_id: task_id})
        return res.json(complete_task)
    }
}

module.exports = new UserController()