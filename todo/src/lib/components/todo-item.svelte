<script>
  import moment from "moment";

  export let id;
  export let name;
  export let priority;
  export let completed;
  export let date;
  export let description;
  export let onDelete;
  export let onSubmit;

  let colorMap = {
    high: "red",
    mid: "yellow",
    low: "green",
  };

  $: colorpick = colorMap[priority];

  let isVisible = false;
  async function handleSubmit(event) {
    try {
      const data = Object.fromEntries(new FormData(event.target));
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
      if (!response.ok) throw new Error("Error updating todo done ");
    } catch (error) {
      console.log(error.message);
    }
  }
  function toggleAddon(event) {
    if (event.target === event.currentTarget) isVisible = !isVisible;
  }
  const priorityOptions = ["low", "mid", "high"];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="todo {completed ? 'blur' : ''}">
  <form on:submit|preventDefault={handleSubmit}>
    <div class="main" on:click|stopPropagation={toggleAddon}>
      <select
        name="priority"
        bind:value={priority}
        class="task-priority"
        style="color: {colorpick};"
      >
        <!-- <option value=""></option> -->
        {#each priorityOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
      <input
        type="checkbox"
        name="completed"
        class="task-checkbox"
        bind:checked={completed}
        on:change={handleComplete}
      />
      <input type="text" name="name" value={name} class="task-name" />
    </div>
    <div class="addons {isVisible ? '' : 'hide'}">
      <input
        type="date"
        class="task-date"
        name="date"
        value={date ? moment(date).format("YYYY-MM-DD") : null}
        min={moment().format("YYYY-MM-DD")}
      />
      <textarea
        name="description"
        class="task-description"
        cols="10"
        rows="10"
        value={description}
      ></textarea>
      <div class="buttons">
        <input type="submit" value="submit" class="btn btn-submit" />
        <button on:click={handleDeleteClick} class="btn btn-delete"
          >delete</button
        >
      </div>
    </div>
  </form>
</div>

<style>
  .todo {
    /* border: 1px solid black; */
    margin: 10px auto;
    padding: 5px 5px;
    border-radius: 20px;
    background-color: teal;
    box-sizing: border-box;
    max-width: 80%;
  }

  .todo:hover {
    box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  }

  .todo .main {
    margin: 10px 10px;
    display: flex;
    align-items: center;
    max-height: 20px;
  }

  .todo .task-priority {
    min-width: 30px;
    min-height: 30px;
    font-size: 18px;
    border: none;
    background: transparent;
    /* color: "{colorpick}"; */
  }

  .todo .task-checkbox {
    margin: 0 7px;
    /* border-radius: 50px; */
    color: beige;
    width: 2em;
    height: 2em;
    border: 0.15em solid beige;
    border-radius: 0.15em;
    transform: translateY(-0.075em);
  }

  .todo .task-name {
    min-height: 30px;
    font-size: 20px;
    border: none;
    background: transparent;
    margin: 0 5px;
    padding: 5px 5px;
    color: white;
  }

  .todo .addons {
    margin: 10px 10px;
    /* display: flex; */
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    gap: 10px;
  }

  .todo .addons .task-date {
    min-height: 40px;
    width: 300px;
    border: 5px solid darkblue;
    border-radius: 10px;
    background: transparent;
    font-size: 15px;
  }

  .todo .addons .task-description {
    max-height: 100px;
    padding: 5px 5px;
    border: 5px solid yellow;
    border-radius: 10px;
    background: transparent;
    font-size: 15px;
  }

  .todo .addons .buttons {
    display: flex;
    justify-content: space-between;
  }

  .todo .addons .buttons .btn {
    width: 90px;
    height: 40px;
    font-size: 15px;
    border-radius: 10px;
  }

  .btn-submit {
    background-color: rgb(6, 86, 156);
    color: white;
  }

  .btn-delete {
    background-color: rgb(163, 7, 36);
    color: white;
  }

  .hide {
    display: none !important;
  }

  .blur {
    filter: blur(1px);
  }
</style>
