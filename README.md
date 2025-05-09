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

*¿Qué es un Middleware?* 

En la consola:

```
npm install cors body-parser
```
