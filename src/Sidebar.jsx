
import Toolbar from "./Toolbar";
import Note from "./Note";

export default function Sidebar(props) {


    function LoadList(){
        console.log("Notes got mapped")

        return(props.notesList.map((note, index) => (
            <Note date={props.notesList[index].date} title={note.title} text={note.text} key={index} id={props.notesList[index].id} setSelectedNote={props.setSelectedNote} selectedNote={props.selectedNote} status={note.status} />
        )))
    }

    return (
        <div id="side-bar" className="side-bar">
            <Toolbar filter={props.filter} createNote={props.createNote}/>
            <div className="notes">
                {LoadList()}
            </div>
        </div>
    );
}