<script>
  import { db } from "./firebase";
  import toastr from "toastr";

  let editStatus = false;
  let currentId;

  let task = {
    name: "",
    description: ""
  };

  let tasks = [];

  //Mostrar registros
  db.collection("tasks").onSnapshot(querySnapshot => {
    let docs = [];
    querySnapshot.forEach(doc => {
      //console.log(doc.data());
      docs.push({
        ...doc.data(),
        id: doc.id //Agregar propiedad id al registro
      });
    });
    tasks = [...docs];
    console.log(tasks);
  }); //Respuesta de Firebase

  //Agregar tarea
  const addTask = async () => {
    await db
      .collection("tasks")
      .doc()
      .set({
        ...task,
        createdAt: Date.now()
      }); //Crear una nueva collecion de documentos con la estructura de Task mas la fecha actual
    toastr.success("Product Added Successfully", "", {
      timeOut: 1500,
      progressBar: true,
      positionClass: "toast-top-right"
    });
    console.log("New Task Added");
  };

  //Manejador del Formulario
  const handleSubmit = (/*e*/) => {
    //e.preventDefault()
    if (!editStatus) {
      addTask(); //Agregar tarea
    } else {
      updateTask();
    }
    task = { name: "", description: "" }; //Limpiar form
  };

  //Eliminar tarea
  const deleteTask = async id => {
    //console.log(id)
    await db
      .collection("tasks")
      .doc(id)
      .delete();
    toastr.success("Task Deleted Successfully!", "", {
      timeOut: 1500,
      progressBar: true,
      positionClass: "toast-top-right"
    });
    console.log("Task Deleted Successfully!");
  };

  //Vaciar data al formulario
  const editTask = currentTask => {
    //console.log(task)
    currentId = currentTask.id; //Guardar id del registro seleccionado
    editStatus = true;
    task.name = currentTask.name;
    task.description = currentTask.description;
  };

  //Actualizar registro
  const updateTask = async () => {
    await db
      .collection("tasks")
      .doc(currentId)
      .update(task);
    toastr.success("Task Updated Successfuly!", "", {
      timeOut: 1500,
      progressBar: true,
      positionClass: "toast-top-right"
    });
    console.log("Task Updated Successfully!");
  };

  //Cancelar la acccion actualizar
  const onCancel = () => {
    editStatus = false;
    task = { name: "", description: "" };
  };
</script>

<style>

</style>

<main>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="/">Svelte Crud</a>
    </div>
  </nav>
  <div class="container p-4">
    <div class="row">
      <div class="col-md-4 text-center">

        <form on:submit|preventDefault={handleSubmit} class="card">
          <div class="card-header">
            <h2>Add New Task</h2>
          </div>
          <div class="card-body">
            <div class="form-group">
              <input
                bind:value={task.name}
                type="text"
                placeholder="Task Name"
                autofocus
                class="form-control" />
            </div>
            <div class="form-group">
              <textarea
                bind:value={task.description}
                rows="3"
                placeholder="Task Description"
                class="form-control" />
            </div>
            <button class="btn btn-info btn-block">
              {#if editStatus}Update{:else}Save{/if}
            </button>
            {#if editStatus}
              <button on:click={onCancel} class="btn btn-danger btn-block">
                Cancel
              </button>
            {/if}
          </div>
        </form>
      </div>
      <div class="col-md-8 text-center">

        {#each tasks as task}
          <div class="card card-body m-2">
            <div class="d-flex justify-content-between">
              <h5>{task.name}</h5>
              <i
                on:click={editTask(task)}
                class="material-icons"
                style="cursor:pointer;">
                create
              </i>
            </div>
            <p>{task.description}</p>
            <button on:click={deleteTask(task.id)} class="btn btn-danger">
              <i class="material-icons">delete_forever</i>
            </button>
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>
