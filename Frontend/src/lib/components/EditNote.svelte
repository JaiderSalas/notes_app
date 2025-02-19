<script>
    import {createEventDispatcher} from "svelte";
  
    let dispatch = createEventDispatcher();
    
    export let note

    let showModal = false;
    
    let id = note.id;
    let title = note.title;
    let content = note.content;
    let archived = note.archived;
  
  
    const handleSubmit = () => {
      const note = {
        title: title,
        content: content,
        id: id,
        archived: archived,
      };
      dispatch("editNote", note);
      showModal = false;
      closeModal();
    };
    function closeModal() {
      showModal = false;
      const closeModalEvent = new CustomEvent("closeModal", {
        bubbles: true,
        composed: true,
      });
      dispatch(closeModalEvent);
    }
  </script>
  
        <form on:submit|preventDefault={handleSubmit}>
          <label for="title">Titulo</label>
          <input type="text" id="title" name="title" required bind:value={title}/>
  
          <label for="content">Contenido</label>
          <textarea id="content" name="content" required bind:value={content} />
          
          <button type="submit">Editar</button>
        </form>
  
  <style>
      
  </style>
  