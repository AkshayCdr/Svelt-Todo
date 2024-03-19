<script>
  import { onMount } from "svelte";
  import TodoItem from "../lib/components/todo-item.svelte";
  let todos = [];

  onMount(async () => {
    await populateTodo();
  });

  async function populateTodo() {
    const response = await fetch("http://localhost:3000/task", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) return new Error("Error submitting");
    todos = await response.json();
    todos = [...todos];
  }

  async function handleSubmit(event) {
    const data = Object.fromEntries(new FormData(event.target));
    if (!data.task) return alert("Enter name");
    const res = await fetch("http://localhost:3000/task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) return new Error("Error submitting");
    await populateTodo();
  }
</script>

<div class="container">
  <div class="input">
    <form on:submit|preventDefault={handleSubmit}>
      <input type="text" name="task" placeholder="add task" class="task-name" />
      <input type="submit" value="add task" class="btn btn-submit" />
    </form>
  </div>

  <div>
    {#each todos as todo (todo.id)}
      <TodoItem
        id={todo.id}
        priority={todo.priority}
        name={todo.name}
        description={todo.description}
        completed={todo.completed}
        date={todo.date}
        onDelete={populateTodo}
        onSubmit={populateTodo}
      />
    {/each}
  </div>
</div>

<style>
  .container {
    max-width: fit-content;
    margin: 20px auto;
    padding: 20px 20px;
    border: 1px solid black;
    /* background-image: linear-gradient(to right, #d7d2cc 0%, #304352 100%); */
    background-color: rgb(91, 5, 69);
    border-radius: 13px;
  }

  .input {
    border: 1px solid black;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 10px;
    padding: 20px;
    border-radius: 20px;
    max-height: 30px;
  }

  .input .task-name {
    min-width: 500px;
    margin: 0 5px;
    min-height: 40px;
    border-radius: 20px;
    text-align: center;
    border: none;
    background-color: transparent;
    font-size: 20px;
    color: white;
  }

  .btn-submit {
    min-width: 100px;
    min-height: 40px;
    background-color: dodgerblue;
    border-radius: 20px;
    color: white;
    font-size: medium;
  }
</style>
