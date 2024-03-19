<script>
  export let id;
  export let name;
  export let priority;
  export let completed;
  export let date;
  export let description;
  export let onDelete;
  export let onSubmit;

  async function handleSubmit(event) {
    try {
      const data = Object.fromEntries(new FormData(event.target));
      console.log(data);
      const response = await fetch(`http://localhost:3000/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });
      if (!response.ok) return new Error("Error submittig data");
      if (onSubmit) onSubmit();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleDeleteClick() {
    try {
      const response = await fetch(`http://localhost:3000/task/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Error deleting data ");
      if (onDelete) onDelete();
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleComplete(event) {
    try {
      const isChecked = event.target.checked;
      const data = { completed: isChecked };
      const response = await fetch(`http://localhost:3000/task/done/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (!response.ok) throw new Error("Error updating todo done ");
    } catch (error) {
      console.log(error.message);
    }
  }
</script>

<div class="todo">
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" name="priority" value={priority} />
    <input
      type="checkbox"
      name="completed"
      bind:checked={completed}
      on:change={handleComplete}
    />
    <input type="text" name="name" value={name} />
    <input type="date" name="date" value={date ? date.split("T")[0] : null} />
    <textarea name="description" cols="30" rows="10" value={description}
    ></textarea>
    <input type="submit" value="submit" />
  </form>
  <button on:click={handleDeleteClick}>delete</button>
</div>

<style>
  .todo {
    border: 1px solid black;
  }
</style>
