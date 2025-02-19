<script>
    import Modal from "./Modal.svelte";
    import AddNote from "./AddNote.svelte";
    import {createEventDispatcher} from "svelte";

    let dispatch = createEventDispatcher();

    export let showModal = false;
    
    const addNote = (e) => {
        showModal = false;
        const note = e.detail;
        dispatch("newNote", note);
    }

  </script>

<div class="Dashboard">
        <button on:click={() => (showModal=true)}>Crear nota</button>
        <Modal tipo="Crear Nota" bind:showModal>
            <AddNote on:addNote={addNote}/>
        </Modal>
</div>

<style>
.Dashboard{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>