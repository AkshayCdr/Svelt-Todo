<script>
  export let id;
  export let name;
  export let priority;
  export let completed;
  export let date;
  export let description;
  export let onDelete;
  export let onSubmit;

  // $: fommattedDAte = date.split("T")[0];
  async function handleSubmit(event) {
    const data = Object.fromEntries(new FormData(event.target));
    console.log(data);
    const response = await fetch(`http://localhost:3000/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });
    if (onSubmit) onSubmit();
  }

  async function handleDeleteClick(event) {
    const response = await fetch(`http://localhost:3000/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (onDelete) onDelete();
  }
</script>

<div class="todo">
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" name="priority" value={priority} />
    <input type="checkbox" name="completed" value="true" checked />
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
