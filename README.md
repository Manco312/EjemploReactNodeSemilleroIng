# Ejemplo - Backend con Node.js y Frontend con React

## 1. Configurar entorno

**Prerrequisitos:**

- Instalar [Node.js](https://nodejs.org/es) y npm
- Tener un IDE (en este caso uso Visual Studio Code)

**Instalaciones de React:**

En la consola de comandos, instalar globalmente:
```
npm install -g create-react-app
npm install -g express-generator
```

## 2. Crear el Backend con Node.js y Express

La idea es crear una API REST con Express

*¿Qué es una API REST?* Es una interfaz que dos sistemas de computación utilizan para intercambiar información de manera segura a través de Internet

**Crear proyecto de Node:**

En la consola de comandos:

```
express backend-api --no-view
cd backend-api
npm install
```

**Instalar Middleware (CORS y body-parser):**

*¿Qué es un Middleware?* Componente que permite unir o comunicar múltiples sistemas o capas. Es un **integrador**.

*¿Qué es CORS?* Es un middleware que permite que un servidor acepte peticiones desde otros dominios o puertos distintos al suyo.

*¿Qué es body-parser?* Es un middleware que permite a tu servidor leer el cuerpo de las solicitudes (por ejemplo, datos enviados en un formulario o JSON).

En la consola:

```
npm install cors body-parser
```

Agregar a App.js (archivo dentro de backend-api):

```
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
```

**Creación de Ruta (API):**

Crear una ruta de ejemplo **routes/tasks.js**:

```
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
```

Agregar a App.js:

```
const tasksRouter = require('./routes/tasks');
app.use('/api/tasks', tasksRouter);
```

**Ejecutar el servidor del Backend:**

```
npm start
```

## 3. Crear el frontend con React

Nuestro objetivo será crear la interfaz de usuario y consumir la API del Backend

En una carpeta diferente al backend ejecutamos lo siguiente en consola:

```
npx create-react-app frontend-app
cd frontend-app
```

**Instalar Axios:**

*¿Qué es Axios?* Es una biblioteca de JavaScript para hacer peticiones HTTP desde el frontend (React) o incluso desde el backend (Node.js). Permite que el frontend se comunique con el backend, enviando o recibiendo datos.

```
npm install axios
```

**Creación del componente principal en src/App.js**

Reemplazar el contenido del archivo por:

```
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:3000/api/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
    if (newTitle.trim() === '') return;
    await axios.post('http://localhost:3000/api/tasks', { title: newTitle });
    setNewTitle('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3000/api/tasks/${id}`);
    fetchTasks();
  };

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
```

**Ejecutar el servidor del FrontEnd**

```
npm start
```

## 4. Opciones de Despliegue

[Vercel](https://vercel.com) ó [Render](https://render.com)
