<script>
    import Header from '$lib/components/Header.svelte';
	import Dashboard from "$lib/components/Dashboard.svelte"
	import Tabs from "$lib/components/Tabs.svelte";
	import Noteslist from "$lib/components/Noteslist.svelte";
  	import NotesArchived from "$lib/components/NotesArchived.svelte";
	import { onMount } from 'svelte';
	//tabs
	let items = ['Mis Notas', 'Archivadas'];
	let activeItem = 'Mis Notas';
	const tabChange = (e) => {
		activeItem = e.detail;
	}

	//notes
	let notes = [];
	let copiedNotes = [...notes];

	onMount(async () => {
		const response = await fetch('http://localhost:3000/notes');
		const data = await response.json();
		notes = data;
		copiedNotes = [...notes];
	})
	
	const newNote = (e) => {

		fetch('http://localhost:3000/add', {
			method: 'POST',
			body: JSON.stringify(e.detail),
			headers: {
				'Content-Type': "application/json; charset=utf-8"
			},
			
		}).then(response => response.json()).then(response => console.log(response));
		const note = e.detail;
		notes = [...notes, note];
		console.log(notes);
	}

	//archive
	const handleArchive = (e) => {
		const id = e.detail.id;
		let copiedNotes = [...notes];
		let updateNote = copiedNotes.find(note => note.id === id);
		updateNote.archived = !updateNote.archived;
		notes = copiedNotes;
	}

	const handleEdit = (e) =>{
		const note = e.detail.note;
		const index = notes.findIndex(n => n.id === e.detail.note.id);
		fetch('http://localhost:3000/update', {

			method: 'POST',
			body: JSON.stringify(e.detail.note),
			headers: {
				'Content-Type': "application/json; charset=utf-8"
			},
			
		}).then(response => response.json()).then(response => console.log(response));

		notes[index] = note;
		copiedNotes = [...notes];

	}
	
	const handleDelete = (e) => {
		const response = notes.filter(note => note.id !== e.detail.id);

		fetch('http://localhost:3000/delete', {
			method: 'POST',
			body: JSON.stringify({id: e.detail.id}),
			headers: {
				'Content-Type': "application/json; charset=utf-8"
			},
			
		}).then(response => response.json()).then(response => console.log(response));

		notes = [...response];
		copiedNotes = [...notes];
	}

</script>
<Header/>
<main>
	<Tabs {activeItem} {items} on:tabChange={tabChange}/>
	{#if activeItem === 'Mis Notas'}
		<Dashboard on:newNote={newNote}/>
		<Noteslist {notes} on:arhive={handleArchive} on:edit={handleEdit} on:delete={handleDelete} />
	{:else if activeItem === 'Archivadas'}
		<NotesArchived {notes} on:arhive={handleArchive} on:edit={handleEdit} on:delete={handleDelete} />
	{/if}
</main>

<style>

</style>