import { useEffect } from "react";
import { db } from "./config/firebase.js";
import {doc, deleteDoc, updateDoc} from "firebase/firestore";

export default function Maincontent(props) {
    const NoteRef = doc(db, "Notes", `${props.selectedNote.id}`)
    const LOCALSTORAGE = props.notesList
    let selectedNoteIndex = LOCALSTORAGE.findIndex((Note) => Note.id === props.selectedNote.id);


    useEffect(() => {
        if (!props.selectedNote.id) {
            document.getElementById("title-input").value = "";
            document.getElementById("text-input").value = "";
        } else {
            document.getElementById("title-input").innerText = props.selectedNote.title;
            document.getElementById("text-input").innerText = props.selectedNote.text;
            document.getElementById("display-date").innerText = props.selectedNote.date;
        }
    }, [props.selectedNote]);

    function SaveNote() {
        let titleInput = document.getElementById("title-input").innerText;
        let textInput = document.getElementById("text-input").innerText;

        if (props.selectedNote.id) {
            LOCALSTORAGE[selectedNoteIndex] = {title: titleInput, text: textInput, date: LOCALSTORAGE[selectedNoteIndex].date, id: LOCALSTORAGE[selectedNoteIndex].id};
            props.setNotesList(LOCALSTORAGE);

            const updateNote = async () => {
                try {
                    await updateDoc(NoteRef, {"title": titleInput, "text": textInput});
                } catch (err) {
                    console.error(err);
                }
            };

            updateNote()
        }
    }

    function deleteNote() {
        if (!props.selectedNote.id) {
        } else {
            LOCALSTORAGE.splice(selectedNoteIndex, 1);
            props.setNotesList(LOCALSTORAGE);
            props.setSelectedNote({ id: undefined });

            const deleteNote = async () =>{
                await deleteDoc(NoteRef)
            }
            deleteNote()
            
        }
    }

    return (
        <div className="main-content">
            <img
                src="/bin1.svg"
                alt="Delete"
                onClick={() => deleteNote()}
            />
            <div className="A4-Blatt">
                <h1
                    contentEditable={!(props.selectedNote.id == undefined)}
                    placeholder="Enter a title"
                    type="text"
                    id="title-input"
                    onInput={SaveNote}
                ></h1>
                <p id="display-date"></p>
                <p
                    contentEditable={!(props.selectedNote.id == undefined)}
                    placeholder="Enter a text"
                    type="text"
                    id="text-input"
                    onInput={SaveNote}
                />{" "}
                <br />
                <br />
            </div>
        </div>
    );
}
