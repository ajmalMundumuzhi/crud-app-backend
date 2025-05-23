const express = require('express');
const router = express.Router();
const taskControlller = require('../controllers/crudController');

router.get('/', taskControlller.getAllTasks);
router.get('/:id', taskControlller.getTaskById);

module.exports = router;