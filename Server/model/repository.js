import { pool } from "../dbConnection.js";

let client = await pool.connect();

export async function getData() {
  try {
    const query = "SELECT * FROM todos";
    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error(error.message);
  }
}

export async function setData(task) {
  try {
    const query = `INSERT INTO todos (name) VALUES ($1)`;
    const values = [task];
    await client.query(query, values);
  } catch (error) {
    console.error(error.message);
  }
}

export async function updateData(id, data) {
  try {
    const query = ` UPDATE todos SET name = $1, priority = $2, description = $3, date = $4, completed = $5 WHERE id = $6`;
    const values = [
      data.name,
      data.priority,
      data.description,
      data.date,
      data.completed,
      id,
    ];
    await client.query(query, values);
  } catch (error) {
    console.error(error.message);
  }
}

export async function deleteData(id) {
  try {
    const query = ` DELETE FROM todos WHERE id = $1`;
    await client.query(query, [id]);
  } catch (error) {
    console.error(error.message);
  }
}
