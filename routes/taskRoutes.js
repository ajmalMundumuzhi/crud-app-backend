const express = require('express');
const router = express.Router();
const taskControlller = require('../controllers/crudController');

router.get('/', taskControlller.getAllTasks);
router.get('/:id', taskControlller.getTaskById);
router.post('/', taskControlller.createTask);
router.put('/:id', taskControlller.updateTask);
router.delete('/:id', taskControlller.deleteTask);

module.exports = router;