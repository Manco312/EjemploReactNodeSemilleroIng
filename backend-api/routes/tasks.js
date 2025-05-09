const express = require('express');
const router = express.Router();

// Variables
let tasks = [];
let idCounter = 1;

// Enviar las tareas
router.get('/', (req, res) => {
  res.json(tasks);
});

// Agregar una nueva tarea
// Se espera que el cuerpo de la solicitud contenga un objeto JSON con la propiedad "title"
router.post('/', (req, res) => {
  const { title } = req.body;
  const newTask = { id: idCounter++, title };
  tasks.push(newTask);
  res.json(newTask);
});

// Eliminar una tarea por ID
// Se espera que el ID de la tarea a eliminar se pase como un parámetro en la URL
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.json({ success: true });
});

module.exports = router;
