const express = require('express');
const { getTasks, addTask, updateTask, getTaskWithId, deleteTask, getStatistics } = require('../controllers/task.controller');
const { verifyToken } = require('../utils/verifyUser.js');

const router = express.Router();

router.get('/statistics', verifyToken, getStatistics);
router.get('/', verifyToken, getTasks);
router.post('/', verifyToken, addTask);
router.get('/:id', verifyToken, getTaskWithId);
router.put('/:id', verifyToken, updateTask);
router.delete('/:id', verifyToken, deleteTask);

module.exports = router;
