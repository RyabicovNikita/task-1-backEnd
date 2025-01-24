const fs = require("fs/promises");
const path = require("path");

const notesFilePath = path.join(__dirname, "db.json");

async function getNotes() {
    const notesJSON = await fs.readFile(notesFilePath, {encoding: 'utf-8'});
    const notes = JSON.parse(notesJSON);
    return Array.isArray(notes) ? notes : [];
}

async function add(title) {
    const notes = await getNotes();
    const newNote = {
        title,
        id: Date.now().toString()
    };
    notes.push(newNote);
    await fs.writeFile(notesFilePath, JSON.stringify(notes));
}

async function removeNote(id) {
    const notes = await getNotes();
    const newNotes = notes.filter(note => note.id !== id);
    if(newNotes.length === notes.length) return "note not found";
    await fs.writeFile(notesFilePath, JSON.stringify(newNotes));
}

module.exports = {
    getNotes,
    add,
    removeNote
}