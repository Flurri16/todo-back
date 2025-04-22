import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import { login, register } from './auth.js';
import {checkAuth} from './checkAuth.js'
import { completeTodo, create, deleteTodo, getAll, importantTodo } from './todo.js';
const app = express()

//Constants
const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

app.use(express.json())
app.use(cors())

app.post('/api/auth/register', register)
app.post('/api/auth/login', login)
app.post('/api/todo/add', checkAuth, create)
app.get('/api/todo/getAll', checkAuth, getAll)
app.delete('/api/todo/delete/:id', checkAuth, deleteTodo)
app.patch('/api/todo/complited/:id', checkAuth, completeTodo)
app.patch('/api/todo/important/:id', checkAuth, importantTodo)

async function start() {
    try {
      await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.u5sgw90.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);
      app.listen(PORT, () => console.log(`Started on PORT:`, PORT));
    } catch (err) {
      console.log(err);
    }
  }
start();
