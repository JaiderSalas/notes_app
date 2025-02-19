<script>
    import Notedetails from "./Notedetails.svelte";
    export let notes = []

</script>
<div class="notes-list">
    {#each notes as {id, title, content, archived }}
      {#if !archived}
        <div class="note-box">    
          <Notedetails note={{ id, title, content, archived }} on:arhive on:edit on:delete/>
        </div>
      {/if}
    {/each}
  </div>

<style>
    .notes-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto; 
}

.note-box {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  position: relative;
  width: 100%;
  max-width: 300px; 
}
</style>