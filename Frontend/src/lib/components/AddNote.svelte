<script>
    import {createEventDispatcher} from "svelte";
    import { v4 } from "uuid";
  
    let dispatch = createEventDispatcher();
    
  
    let showModal = false;
  
    let title = "";
    let content;
    let archived = false;
  
    const handleSubmit = () => {
      const note = {
        title: title,
        content: content,
        id: v4(),
        archived: archived,
      };
      dispatch("addNote", note);
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
  
          <button type="submit">Crear</button>
        </form>
  
  <style>
      
  </style>
  