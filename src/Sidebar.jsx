import { useEffect } from "react";
import Toolbar from "./Toolbar";
import Note from "./Note";

export default function Sidebar(props) {

    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem("Notes"));
        props.setNotesList(storedNotes);
    }, []);

    return (
        <div id="side-bar" className="side-bar">
            <Toolbar setShowingNotes={props.setShowingNotes} setNotesList={props.setNotesList} notesList={props.notesList} getCurrentDate={props.getCurrentDate} setSelectedNote={props.setSelectedNote} selectedNote={props.selectedNote} />
            <div className="notes">
                {props.notesList.map((note, index) => (
                <Note date={props.notesList[index].date} key={index} id={index} title={note.title} text={note.text} setSelectedNote={props.setSelectedNote} selectedNote={props.selectedNote} status={note.status} />
                    ))
                }
                </div>
            </div>
    );
}