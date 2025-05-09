const express = require('express');
const router = express.Router();

let tasks = [];
let idCounter = 1;

router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { title } = req.body;
  const newTask = { id: idCounter++, title };
  tasks.push(newTask);
  res.json(newTask);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.json({ success: true });
});

module.exports = router;
