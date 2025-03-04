import { useEffect } from "react";
import Toolbar from "./Toolbar";
import Note from "./Note";

export default function Sidebar(props) {

    function deleteNote(id) {
        let arrayToSplice = JSON.parse(localStorage.getItem("Notes"));
        arrayToSplice.splice(id, 1);
        localStorage.setItem("Notes", JSON.stringify(arrayToSplice));
        props.setNoteList(arrayToSplice);

        if (props.selectedNote.id === id) {
            props.setSelectedNote({id: undefined});
        }
    }

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem("Notes"));
        props.setNoteList(storedNotes);
    }, []);

    return (
        <>
            <Toolbar  setSelectedNote={props.setSelectedNote} selectedNote={props.selectedNote} setNoteList={props.setNoteList} />
            {props.notesList.map((note, index) => (
                <Note deleteNote={deleteNote} key={index} id={index} title={note.title} text={note.text} setSelectedNote={props.setSelectedNote} selectedNote={props.selectedNote} />
            ))}
        </>
    );
}
