import { Todo } from "./todos.model.js";

export async function getData() {}

export async function setData(task) {
  try {
    const todo = await Todo.create(task);
  } catch (error) {
    console.log(error.message);
  }
}

export async function updateData(id, data) {}

export async function deleteData(id) {}

export async function updateTaskCompletion(id, data) {}
