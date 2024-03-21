import { Todo } from "./todos.model.js";

import db from "../dbConnection.js";

export async function getData() {
  try {
    const todo = await Todo.find();
    return todo;
  } catch (error) {
    console.log(error.message);
  }
}

export async function setData(data) {
  try {
    const todo = await Todo.create(data);
  } catch (error) {
    console.log(error.message);
  }
}

export async function updateData(id, data) {}

export async function deleteData(id) {}

export async function updateTaskCompletion(id, data) {}
