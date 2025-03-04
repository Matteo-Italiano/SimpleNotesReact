import { useState } from 'react'


export default function Note(props) {

    function Selector(){
        let backgroundColor;

        if (props.selectedNote.id == undefined){
            backgroundColor = "white"
        } else {
            if (props.selectedNote.id === props.id){
                backgroundColor = "grey"
            } else {
                backgroundColor = "white"
            }
            return(backgroundColor)
        }
    }

    return (
        <>
        <div style={{backgroundColor: Selector()}} onClick={() =>{
            
            if (props.selectedNote.id === props.id){
                props.setSelectedNote({id: undefined})
            } else {
                props.setSelectedNote({ id: props.id, title: props.title, text: props.text }) 
            }
            }}>
            <h2>Note: {props.id + 1}</h2>
            <p>Title: {props.title}</p>
            <p>Text: {props.text}</p>
        </div>
        <img src="/bin1.svg" alt="Löschen" onClick={() => props.deleteNote(props.id)} />
        </>
        
    );
}
