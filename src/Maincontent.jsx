import { useEffect } from "react";

export default function Maincontent(props) {

    useEffect(() => {
        if (props.selectedNote.id == undefined){
            document.getElementById("title-input").value = ""
            document.getElementById("text-input").value = ""
        } else {
            document.getElementById("title-input").innerText = props.selectedNote.title
            document.getElementById("text-input").innerText = props.selectedNote.text;
            document.getElementById("display-date").innerText = props.selectedNote.date
        }
    }, [props.selectedNote]);

    function SaveNote() {
        let titleInput = document.getElementById("title-input").innerText;
        let textInput = document.getElementById("text-input").innerText;
        let newList = JSON.parse(localStorage.getItem("Notes"));

            if (props.selectedNote.id !== undefined) {
                newList[props.selectedNote.id] = {title: titleInput, text: textInput, date: (newList[props.selectedNote.id].date).toString()};
                props.setNotesList(newList);
                localStorage.setItem("Notes", JSON.stringify(newList));
            }
    }

    function deleteNote(id) {
        if (id == undefined){

        } else {
        let arrayToSplice = JSON.parse(localStorage.getItem("Notes"));
        arrayToSplice.splice(id, 1);
        localStorage.setItem("Notes", JSON.stringify(arrayToSplice));
        props.setNotesList(arrayToSplice);

        if (props.selectedNote.id === id) {
                props.setSelectedNote({id: undefined});
            }
        }
    }

    return (
        <div className="main-content">
            <img src="/bin1.svg" alt="Delete" onClick={() => deleteNote(props.selectedNote.id)}/>
            <div className="A4-Blatt">
            <h1 contentEditable={!(props.selectedNote.id == undefined)} placeholder="Enter a title" type="text" id="title-input" onInput={SaveNote}></h1>    

            <p id="display-date"></p>

            <p contentEditable={!(props.selectedNote.id == undefined)}  placeholder="Enter a text" type="text"  id="text-input" onInput={SaveNote} />        <br /><br />
            
            </div>
        </div>
    );
}
