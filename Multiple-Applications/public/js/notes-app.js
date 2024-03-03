let AddNote = document.querySelector(".notes");
let NewNote = document.getElementById("addbtn");
// let RemoveNote=document.querySelector("#trash");

NewNote.addEventListener(
    "click",
    function () {
        AddNewNote();
    }
);

const AddNewNote = (text = "") => {

    let note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
        <div class="nav">
            <h4 id="notenum">Note</h4>
            <div class="options">
                <i id="save" class="fa fa-save" aria-hidden="true"></i>
                <i id="trash" class="fa fa-trash" aria-hidden="true"></i>
            </div>
        </div>
        <i class="fa fa-copy" aria-hidden="true"></i>
        <textarea class="text">${text}</textarea>
    `;

    note.addEventListener(
        "focusout",
        function () {
            SaveNotes();
            replace(note);
        }
    );

    note.querySelector("#trash").addEventListener(
        "click",
        function () {
            note.remove();
            SaveNotes();
        }
    );

    note.querySelector(".fa-copy").addEventListener(
        "click",
        function () {
            let copy = note.querySelector(".text").value;
            navigator.clipboard.writeText(copy);
        }
    );

    note.querySelector("#save").addEventListener(
        "click",
        function () {
            SaveNotes();
            replace(note);
        }
    );


    AddNote.appendChild(note);

    SaveNotes();


}

function replace(note) {
    note.querySelector("#save").classList.replace("fa-save", "fa-spinner");
    setTimeout(function () {
        note.querySelector("#save").classList.replace("fa-spinner", "fa-save");
    }, 1200);
}


const SaveNotes = () => {
    let content = document.querySelectorAll(".text");

    let data = [];

    content.forEach(element => {
        data.push(element.value);
    });


    localStorage.clear();
    localStorage.setItem("notes", JSON.stringify(data));
}


let GetData = localStorage.getItem("notes");

if (GetData == null || GetData == undefined || GetData == "") {
    localStorage.clear();
    AddNewNote();
}
else {
    // let keyword = "";
    // GetData += ",";
    // for (let i = 0; i <= GetData.length; i++) {
    //     if (GetData[i] == ",") {
    //         AddNewNote(keyword);
    //         keyword = "";
    //     }
    //     else {
    //         keyword += GetData[i];
    //     }
    // }

    JSON.parse(GetData).forEach((element) => {
        AddNewNote(element);
    });
}