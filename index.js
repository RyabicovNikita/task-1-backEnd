const yargs = require("yargs")
const {getNotes, add, removeNote} = require("./controller")

yargs.command({
    command: "add",
    describe: "Add new note",
    builder: {
        title: {
            type: "string",
            describe: "This is title",
            demandOption: true,
        }
    },
    async handler({title}) {
        await add(title);
        console.log('note successful add');
    }
});

yargs.command({
    command: "list",
    describe: "View all notes",
    async handler() {
        const notes = await getNotes();
        console.log(notes.map(note => `${note.id} ${note.title} \n`) );
    }
})

yargs.command({
    command:"remove",
    describe: "Remove note by id",
    builder: {
        id: {
            type: "string",
            describe: "This is id note for find",
            demandOption: true
        }
    },
    async handler({id}) {
        const error = await removeNote(id);
        if(error) console.log(error);
        else console.log("note successful delete");
    }
})

yargs.parse();