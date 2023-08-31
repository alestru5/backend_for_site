const Router = require('express')
const router = new Router()
const tasksController = require('../controllers/tasksController')


router.post('/create', tasksController.create)
router.get('/list', tasksController.list)
router.get('/list_complete_task', tasksController.list_complete_task)
router.put('/complete_score', tasksController.complete_score)
router.post('/complete_task', tasksController.complete_task)


module.exports = router