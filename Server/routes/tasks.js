import express from "express";
import {
  getTodo,
  addTodos,
  updateTodos,
  deleteTodos,
} from "../controller/task.controller.js";

const router = express.Router();

router.get("/", getTodo);

router.post("/", addTodos);

router.put("/:id", updateTodos);

router.delete("/:id", deleteTodos);

export default router;
