const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
   const notes = await getNotes();
   const note = {
      title,
      id: Date.now().toString(),
   };

   notes.push(note);

   await saveNotes(notes);
   console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
   const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
   return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
   await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
   const notes = await getNotes();

   console.log(chalk.bgCyan("Here is the list of notes:"));
   notes.forEach((note) => {
      console.log(chalk.cyan(note.id), chalk.yellow(note.title));
   });
}

async function removeNote(noteId) {
   const notes = await getNotes();
   const newNotes = notes.filter((note) => note.id !== String(noteId));
   if (notes.length !== newNotes.length) {
      await saveNotes(newNotes);
      console.log(chalk.blue("note deleted successfully!"));
   } else {
      console.log(chalk.red("this id does not exist!"));
   }
}

async function editNote(params) {
   const notes = await getNotes();
   const newNotes = notes.map((note) => {
      return note.id !== params.id ? note : { ...note, title: params.title };
   });
   await saveNotes(newNotes);
}

module.exports = {
   addNote,
   printNotes,
   removeNote,
   getNotes,
   editNote,
};
