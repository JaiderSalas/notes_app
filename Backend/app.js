const express = require('express');
const bodyParser = require('body-parser');
const { readFile, writeFile } = require('fs');

const cors = require('cors');
const app = express();
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let notes = [];

function save() {
    writeFile('./api.json', JSON.stringify({notes:notes}), (err,data) => {
        console.log('Saved',data);
    });
}

app.get('/notes', (req, res) => {
    readFile('./api.json','utf-8', (err, data) => {
        if(err) throw new Error(err.message);
        const json = JSON.parse(data);

        notes = [...json.notes];
        res.json(notes);
    });
})

app.post('/add', (req, res) => {
    notes = [...notes, req.body];

    res.json({message: 'Note added'});

    save();
});


app.post('/delete', (req, res) => {
    const results = notes.filter(note => note.id !== req.body.id);
    notes = [...results];
    res.json({message: 'Note deleted'});
    save();
})


app.post('/update', (req, res) => {
    const note = req.body;
    const index = notes.findIndex(n => n.id === note.id);
    notes[index] = note;
    save();

    res.json({message: 'Note updated'});
});

app.listen('3000', () => console.log('Server started at port 3000'));