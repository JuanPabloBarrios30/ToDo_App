import express from 'express';
import usersRouter from './users/users.routes.js';
import tasksRouter from './tasks/tasks.routes.js';

const router = express.Router();

// /api/
router.use('/users', usersRouter);
router.use('/tasks', tasksRouter);

export default router;