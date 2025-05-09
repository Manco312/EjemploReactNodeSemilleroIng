import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  // Función para obtener las tareas desde el backend
  // Se espera que el backend esté corriendo en http://localhost:3000
  // y que la ruta para obtener las tareas sea /api/tasks
  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:3000/api/tasks');
    setTasks(res.data);
  };

  // Función para agregar una nueva tarea
  // Se espera que el backend esté corriendo en http://localhost:3000
  // y que la ruta para agregar tareas sea /api/tasks
  const addTask = async () => {
    if (newTitle.trim() === '') return;
    await axios.post('http://localhost:3000/api/tasks', { title: newTitle });
    setNewTitle('');
    fetchTasks();
  };

  // Función para eliminar una tarea
  // Se espera que el backend esté corriendo en http://localhost:3000
  // y que la ruta para eliminar tareas sea /api/tasks/:id
  // donde :id es el ID de la tarea a eliminar
  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3000/api/tasks/${id}`);
    fetchTasks();
  };

  // Retorna el componente principal
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Lista de Tareas</h1>
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Nueva tarea"
      />
      <button onClick={addTask}>Agregar</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} <button onClick={() => deleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
