import { useEffect } from "react";
import { db } from "./config/firebase.js";
import { getDocs, getDoc, collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import Note from "./Note.jsx";

export default function Maincontent(props) {
    const NoteRef = doc(db, "Notes", `${props.selectedNote.id}`)

    useEffect(() => {
        if (props.selectedNote.id == undefined) {
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
        let newList = JSON.parse(localStorage.getItem("Notes"));

        if (props.selectedNote.id !== undefined) {
            let selectedNoteIndex = newList.findIndex((Note) => Note.id === props.selectedNote.id);

            newList[selectedNoteIndex] = {title: titleInput, text: textInput, date: newList[selectedNoteIndex].date.toString(), id: newList[selectedNoteIndex].id};
            props.setNotesList(newList);

            const updateNote = async () => {
                try {
                    await updateDoc(NoteRef, {"title": titleInput, "text": textInput});
                } catch (err) {
                    console.error(err);
                }
            };

            updateNote()
            localStorage.setItem("Notes", JSON.stringify(newList));
        }
    }

    function deleteNote() {
        if (props.selectedNote.id == undefined) {
        } else {
            let arrayToSplice = JSON.parse(localStorage.getItem("Notes"));
            arrayToSplice.splice(arrayToSplice.findIndex((Note) => Note.id === props.selectedNote.id), 1);
            localStorage.setItem("Notes", JSON.stringify(arrayToSplice));
            props.setNotesList(arrayToSplice);
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
