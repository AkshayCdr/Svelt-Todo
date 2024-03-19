import {
  getData,
  setData,
  updateData,
  deleteData,
} from "../model/repository.js";

export async function getTodo(req, res) {
  try {
    const dataFromDb = await getData();
    res.send(JSON.stringify(dataFromDb));
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error" });
  }
}

export async function addTodos(req, res) {
  try {
    const { task } = req.body;
    if (!task) throw new Error("Missing taskname");
    await setData(task);
    res.status(201).json({ message: "successfully created" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error " });
  }
}

export async function updateTodos(req, res) {
  try {
    await updateData(req.params.id, req.body);
    res.status(200).json({ message: "succesfully updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error" });
  }
}

export async function deleteTodos(req, res) {
  try {
    await deleteData(req.params.id);
    res.status(204).json({ message: "successfull deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error" });
  }
}