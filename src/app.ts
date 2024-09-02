import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { loginValidation, registerValidation } from './helpers/validations/auth';

import checkAuth from './middlewares/checkAuth';

import * as UserController from './controllers/UserController';
import * as HabitController from './controllers/HabitController';
import * as TaskController from './controllers/TaskController';

import { createHabitValidation } from './helpers/validations/habit';
import { createTaskValidation } from './helpers/validations/task';


mongoose.connect('mongodb+srv://spamerik7:22hYWbYaJ5ZOi1z1@mongo-db.oa4cm4e.mongodb.net/blog?retryWrites=true&w=majority&appName=mongo-db')
    .then(()=> console.log('DB is connected'))
    .catch(() => console.log('Error in connecting to DB'))


const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use(express.json());

app.post('/auth/register', registerValidation, UserController.register)
app.post('/auth/login', loginValidation, UserController.login)
app.get('/auth/about', checkAuth, UserController.aboutMe)

app.get('/habits', checkAuth, HabitController.getAll)
app.post('/habits', checkAuth, createHabitValidation, HabitController.create)
app.patch('/habits/:id', createHabitValidation, HabitController.update);

app.get('/tasks', checkAuth, TaskController.getAll)
app.post('/tasks', checkAuth, createTaskValidation, TaskController.create)
app.patch('/tasks/:id', createTaskValidation, TaskController.update)



export default app;