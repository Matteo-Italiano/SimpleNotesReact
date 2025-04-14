import { doc } from "firebase/firestore";

export default function Maincontent(props) {

    return (
        <div className="main-content">
            <img
                src="./bin1.svg"
                alt="Delete"
                onClick={() => props.deleteNote(props.selectedNote)}
            />
            <img src={props.selectedNote.pinned == true ? './Pin-Full.png' : './Pin-Empty.png'} className="pin-main" onClick={() => props.handlePinChange(props.selectedNote)}/>
            <div className="A4-Blatt">
                <h1
                    contentEditable={!(props.selectedNote.id == undefined)}
                    placeholder="Enter a title"
                    type="text"
                    id="title-input"
                    onInput={() => props.saveNote()}
                ></h1>
                <p id="display-date"></p>
                <p
                    contentEditable={!(props.selectedNote.id == undefined)}
                    placeholder="Enter a text"
                    type="text"
                    id="text-input"
                    onInput={() => props.saveNote()}
                />{" "}
                <br />
                <br />
            </div>
        </div>
    );
}
