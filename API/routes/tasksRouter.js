const Router = require('express')
const router = new Router()
const tasksController = require('../controllers/tasksController')


router.post('/create', tasksController.create)
router.get('/list', tasksController.list)
router.put('/complete', tasksController.complete)

module.exports = router