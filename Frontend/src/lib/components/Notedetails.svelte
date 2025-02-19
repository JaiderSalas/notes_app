<script>
  import {createEventDispatcher} from "svelte";
  import Modal from "./Modal.svelte";
  import EditNote from "./EditNote.svelte";

    let dispatch = createEventDispatcher();

    export let note
    const handleArchive = (id) => {
        dispatch('arhive',{id});
    }
    const handleEdit = (note) => {
        dispatch('edit',{note});
    }
    const handleDelete = (id) => {
        pressed = 3
        dispatch('delete',{id});
    }
    const editNote = (e) => {
        showModal = false;
        const note = e.detail;
        handleEdit(note);
    }
    export let showModal = false;
    let pressed = 0;
</script>

<div class="note">

    <div class="note-title">
        <p>{note.title}</p>
      </div>
    
    <div class="note-content">
        <p>{note.content}</p>
      </div>
      <div class="note-buttons">
        <button on:click={() => handleArchive(note.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m480-240 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160ZM200-640v440h560v-440H200Zm0 520q-33 0-56.5-23.5T120-200v-499q0-14 4.5-27t13.5-24l50-61q11-14 27.5-21.5T250-840h460q18 0 34.5 7.5T772-811l50 61q9 11 13.5 24t4.5 27v499q0 33-23.5 56.5T760-120H200Zm16-600h528l-34-40H250l-34 40Zm264 300Z"/></svg>
        </button>
        <button on:click={() => (showModal=true, pressed=1)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h56l345-345-56-56-345 345v56Zm572-403L602-771l56-56q23-23 56.5-23t56.5 23l56 56q23 23 24 55.5T829-660l-57 57Zm-58 59L290-120H120v-170l424-424 170 170Zm-141-29-28-28 56 56-28-28Z"/></svg>
        </button>
        {#if pressed==1}
        <Modal tipo="Editar Nota" bind:showModal>
          <EditNote note={note} on:editNote={editNote} />
        </Modal>
        {/if}
        <button on:click={() => (showModal=true, pressed=0)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
        </button>
        {#if pressed==0}
        <Modal tipo="" bind:showModal>
          <p>¿Estas seguro que quieres eliminar esta nota?</p>
          <button on:click={() => handleDelete(note.id)}>Si</button>
          <button on:click={() => (showModal=false)}>No</button>
        </Modal>
        {/if}
      </div>
</div>

<style>
.note-title {
  font-weight: bold;
  font-size: 18px;
}

.note-content {
  font-size: 16px;
}
.note-buttons {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.note-buttons button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 5px;
}
</style>