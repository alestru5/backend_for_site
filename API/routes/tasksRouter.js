const Router = require('express')
const router = new Router()
const tasksController = require('../controllers/tasksController')


router.post('/create', tasksController.create)
router.get('/list', tasksController.list)

module.exports = router