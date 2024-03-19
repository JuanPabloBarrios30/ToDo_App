import express from "express";
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../../controllers/tasks/tasks.controller.js";
import { authRequired } from "../../middlewares/auth.middleware.js";
import { validateSchema } from "../../middlewares/validator.middleware.js";
import { createTaskSchema } from "../../schemas/task.schema.js";

const router = express.Router();

router.get("/", [authRequired], getAllTasks);
router.get("/:id", [authRequired], getTask);
router.post("/", [authRequired], validateSchema(createTaskSchema), createTask);
router.put("/:id", [authRequired], updateTask);
router.delete("/:id", [authRequired], deleteTask);

export default router;
