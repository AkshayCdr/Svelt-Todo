import {
  getData,
  setData,
  updateData,
  deleteData,
  updateTaskCompletion,
} from "../model/repository.js";

function updateDate(data) {
  const updatedData = data.map((task) => {
    const newDate = task.date ? new Date(task.date).toLocaleDateString() : "";
    return Object.fromEntries(
      Object.entries(task).map(([key, value]) => {
        return key === "date" ? [key, newDate] : [key, value];
      })
    );
  });
  return updatedData;
}

export async function getTodo(req, res) {
  try {
    const dataFromDb = await getData();
    const updatedData = updateDate(dataFromDb);
    res.send(JSON.stringify(updatedData));
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

export async function updateCompleteTask(req, res) {
  try {
    await updateTaskCompletion(req.params.id, req.body);
    res.status(200).json({ message: "succesfully updated checkbox" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "server error" });
  }
}
