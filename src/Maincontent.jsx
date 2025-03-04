import { useEffect } from "react";

export default function Maincontent(props) {

    useEffect(() => {
        document.getElementById("title-input").value = props.selectedNote.title;
        document.getElementById("text-input").value = props.selectedNote.text;
    }, [props.selectedNote]);

    function SaveNote() {
        let titleInput = document.getElementById("title-input").value;
        let textInput = document.getElementById("text-input").value;

            let newList = JSON.parse(localStorage.getItem("Notes"));


            if (props.selectedNote.id !== undefined) {
                newList[props.selectedNote.id] = { title: titleInput, text: textInput };
                props.setNoteList(newList);
                localStorage.setItem("Notes", JSON.stringify(newList));
            }
    }

    return (
        <>
            <h1>Title</h1>
            <input type="text" id="title-input" onChange={SaveNote} /> <br /><br />
            <h2>Text</h2>
            <input type="text" id="text-input"  onChange={SaveNote} /> <br /><br />
        </>
    );
}
