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
    console.log(response);
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

<form on:submit|preventDefault={handleSubmit}>
  <input type="text" name="task" placeholder="add task" />
  <input type="submit" value="add task" />
</form>

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
