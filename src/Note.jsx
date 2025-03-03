import { useState } from "react";
import Maincontent from "./Maincontent";

export default function Note(props){

    return(
        <>
        <div>
        <div >
            <h2>Note: {props.id + 1} </h2>
            <p>Title: {props.title} </p>
            <p>Text: {props.text}</p>
        </div>
        <img src="/bin1.svg" alt="Bild" onClick={() => props.deleteNote(props.id)} />
        </div>
        </>
    )
}