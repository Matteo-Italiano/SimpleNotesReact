import Toolbar from "./Toolbar";
import Note from "./Note";

export default function Sidebar(props) {

    return (
        <div id="side-bar" className="side-bar">
            <Toolbar filter={props.filterNotes} createNote={props.createNote}/>
            <div className="notes">
                {props.notesList.map((note, index) => (
            <Note formatDateToString={props.formatDateToString} getCurrentDate={props.getCurrentDate} pinned={note.pinned} key={index} date={props.notesList[index].date} title={note.title} text={note.text} id={props.notesList[index].id} setSelectedNote={props.setSelectedNote} selectedNote={props.selectedNote} status={note.status} />
        ))}
            </div>
        </div>
    );
}