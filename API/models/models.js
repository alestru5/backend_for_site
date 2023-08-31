const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    login: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    score: {type: DataTypes.INTEGER},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})
const Task = sequelize.define('tasks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true,},
    body: {type: DataTypes.STRING,},
    score: {type: DataTypes.INTEGER},
    answer: {type: DataTypes.STRING},
})
const Complete_Task = sequelize.define('complete_tasks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user_id: {type: DataTypes.INTEGER},
    task_id: {type: DataTypes.INTEGER},
})

User.hasMany(Complete_Task)
Complete_Task.belongsTo(User)


module.exports = {
    User,
    Task,
    Complete_Task
}