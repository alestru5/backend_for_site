const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    login: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})
const Task = sequelize.define('tasks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true,},
    body: {type: DataTypes.STRING,},
    score: {type: DataTypes.INTEGER},
    answer: {type: DataTypes.STRING},
})

module.exports = {
    User,
    Task
}