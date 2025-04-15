
export default function Note(props) {


    return (
        <div draggable="true" className={`${props.selectedNote.id === props.id ? "selected" : "un-selected"} ${"small-note"} ${props.status ? "hidden" : ""}`}>
        <div className='small-note-inside' onClick={() => props.selectedNote.id === props.id ? props.setSelectedNote({id: undefined}) : props.setSelectedNote({ id: props.id, title: props.title, text: props.text, date: props.date, pinned: props.pinned})}>
            <img id="small-pin" src={props.pinned ? './Pin-Full.png': './Pin-Empty.png'} alt="" className="pin"/>
            <h2 className='small-note-title'> <b>{(props.title).toString().slice(0,26)}</b></h2>
            <h4 className='small-note-text' >{(props.text).toString().slice(0,73)}</h4>
            <p className='small-note-date'>{props.getCurrentDate(props.date)}</p>
        </div>
        </div>
    );
}
