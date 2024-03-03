let mon = document.getElementById("mon");
let tues = document.getElementById("tues");
let wed = document.getElementById("wed");
let thir = document.getElementById("thir");
let fri = document.getElementById("fri");
let sat = document.getElementById("sat");
let sun = document.getElementById("sun");

mon.onclick = function () {
    Monday();
}

tues.onclick = function () {
    Tuesday();
}

wed.onclick = function () {
    Wednesday();
}

thir.onclick = function () {
    Thirsday();
}

fri.onclick = function () {
    Friday();
}

sat.onclick = function () {
    Saturday();
}

sun.onclick = function () {
    Sunday();
}


const Sunday = () => {
    sun.classList.toggle("color");
}

const Monday = () => {
    mon.classList.toggle("color");
}

const Tuesday = () => {
    tues.classList.toggle("color");
}

const Wednesday = () => {
    wed.classList.toggle("color");
}

const Thirsday = () => {
    thir.classList.toggle("color");
}

const Friday = () => {
    fri.classList.toggle("color");
}

const Saturday = () => {
    sat.classList.toggle("color");
}

let today = new Date().getDay();


switch (today) {
    case 0:
        Sunday();
        break;
    case 1:
        Monday();
        break;
    case 2:
        Tuesday();
        break;
    case 3:
        Wednesday();
        break;
    case 4:
        Thirsday();
        break;
    case 5:
        Friday();
        break;
    case 6:
        Saturday();
        break;
}


let GetTask_1 = document.querySelector(".taskName-1");
let GetTask_2 = document.querySelector(".taskName-2");
let GetTask_3 = document.querySelector(".taskName-3");
let GetTask_4 = document.querySelector(".taskName-4");
let GetTask_5 = document.querySelector(".taskName-5");


let AddTask_1 = document.querySelector(".tasks-1");
let AddTask_2 = document.querySelector(".tasks-2");
let AddTask_3 = document.querySelector(".tasks-3");
let AddTask_4 = document.querySelector(".tasks-4");
let AddTask_5 = document.querySelector(".tasks-5");



GetTask_1.addEventListener(
    "keyup",
    function (event) {
        if (event.key == "Enter") {
            AddContent(this.value, AddTask_1);
            this.value = "";
        }
    }
);

GetTask_2.addEventListener(
    "keyup",
    function (event) {
        if (event.key == "Enter") {
            AddContent(this.value, AddTask_2);
            this.value = "";
        }
    }
);

GetTask_3.addEventListener(
    "keyup",
    function (event) {
        if (event.key == "Enter") {
            AddContent(this.value, AddTask_3);
            this.value = "";
        }
    }
);

GetTask_4.addEventListener(
    "keyup",
    function (event) {
        if (event.key == "Enter") {
            AddContent(this.value, AddTask_4);
            this.value = "";
        }
    }
);

GetTask_5.addEventListener(
    "keyup",
    function (event) {
        if (event.key == "Enter") {
            AddContent(this.value, AddTask_5);
            this.value = "";
        }
    }
);

const prepareTemplate = (number, task) => {
    return `
    <p class="inside-task-${number}">${task}</p>
    <i class="fa fa-times" aria-hidden="true"></i>
    `;
}

// AddContent and DisplayContent should be different functions, its a bad practice
function AddContent(task, name) {
    let content = document.createElement("div");
    content.classList.add("task");
    if (name == AddTask_1) {
        content.innerHTML = prepareTemplate(1, task);
    }
    else if (name == AddTask_2) {
        content.innerHTML = prepareTemplate(2, task);
    }
    else if (name == AddTask_3) {
        content.innerHTML = prepareTemplate(3, task);
    }
    else if (name == AddTask_4) {
        content.innerHTML = prepareTemplate(4, task);
    }
    else {
        content.innerHTML = prepareTemplate(5, task);
    }


    content.addEventListener(
        "click",
        function () {
            content.classList.toggle("completed");
            if (content.classList.contains("completed")) {
                removeContent(name, false, task);
                SaveContent(name, true, task);
            }
            else {
                removeContent(name, true, task);
                SaveContent(name, false, task);
            }
        }
    );

    content.querySelector(".fa-times").addEventListener(
        "click",
        function () {
            // let value = content.firstElementChild.value;
            if (content.classList.contains("completed")) {
                removeContent(name, true, task);
            }
            else {
                removeContent(name, false, task);
            }
            content.remove();
        }
    );

    name.appendChild(content);

    SaveContent(name, false, task);
}

const DisplayContent = (task, name, completed) =>{
    let content = document.createElement("div");
    content.classList.add("task");
    if (name == AddTask_1) {
        content.innerHTML = prepareTemplate(1, task);
    }
    else if (name == AddTask_2) {
        content.innerHTML = prepareTemplate(2, task);
    }
    else if (name == AddTask_3) {
        content.innerHTML = prepareTemplate(3, task);
    }
    else if (name == AddTask_4) {
        content.innerHTML = prepareTemplate(4, task);
    }
    else {
        content.innerHTML = prepareTemplate(5, task);
    }

    content.addEventListener(
        "click",
        function () {
            content.classList.toggle("completed");
            if (content.classList.contains("completed")) {
                removeContent(name, false, task);
                SaveContent(name, true, task);
            }
            else {
                removeContent(name, true, task);
                SaveContent(name, false, task);
            }
        }
    );

    content.querySelector(".fa-times").addEventListener(
        "click",
        function () {
            // let value = content.firstElementChild.value;
            if (content.classList.contains("completed")) {
                removeContent(name, true, task);
            }
            else {
                removeContent(name, false, task);
            }
            content.remove();
        }
    );

    name.appendChild(content);

    if(completed){
        content.classList.add("completed");
    }
}

const returnMapping = (name, completed) => {
    if (name == AddTask_1) {
        if (completed) {
            return "top-completed";
        }
        else {
            return "top";
        }
    }
    else if (name == AddTask_2) {
        if (completed) {
            return "other-completed";
        }
        else {
            return "other";
        }
    }
    else if (name == AddTask_3) {
        if (completed) {
            return "meals-completed";
        }
        else {
            return "meals";
        }
    }
    else if (name == AddTask_4) {
        if (completed) {
            return "low-completed";
        }
        else {
            return "low";
        }
    }
    else {
        if (completed) {
            return "notes-completed";
        }
        else {
            return "notes";
        }
    }
}

const insertData = (key, value) => {
    if (localStorage.getItem(key) == undefined) {
        localStorage.setItem(key, JSON.stringify([value]));
    }
    else {
        let previousData = JSON.parse(localStorage.getItem(key));
        previousData.push(value);
        localStorage.setItem(key, JSON.stringify(previousData));
    }
}

const SaveContent = (name, completed, value) => {
    insertData(returnMapping(name, completed), value);
}

function removeData(key, value) {
    let data = JSON.parse(localStorage.getItem(key));
    data = data.filter((element) => {
        return element != value;
    });
    localStorage.setItem(key, JSON.stringify(data));
}

function removeContent(name, completed, value) {
    removeData(returnMapping(name, completed), value);
}

function Recover(data, name, completed) {
    if (data == null || data == undefined || data == "") {
        return;
    }
    else {
        data.forEach((element) => {
            DisplayContent(element, name, completed);
        });
    }
}

const main = () => {
    let top = JSON.parse(localStorage.getItem("top"));
    let top_completed = JSON.parse(localStorage.getItem("top-completed"));
    Recover(top, AddTask_1, false);
    Recover(top_completed, AddTask_1, true);
    let other = JSON.parse(localStorage.getItem("other"));
    let other_completed = JSON.parse(localStorage.getItem("other-completed"));
    Recover(other, AddTask_2), false;
    Recover(other_completed, AddTask_2, true);
    let meals = JSON.parse(localStorage.getItem("meals"));
    let meals_completed = JSON.parse(localStorage.getItem("meals-completed"));
    Recover(meals, AddTask_3, false);
    Recover(meals_completed, AddTask_3, true);
    let low = JSON.parse(localStorage.getItem("low"));
    let low_completed = JSON.parse(localStorage.getItem("low-completed"));
    Recover(low, AddTask_4, false);
    Recover(low_completed, AddTask_4, true);
    let notes = JSON.parse(localStorage.getItem("notes"));
    let notes_completed = JSON.parse(localStorage.getItem("notes-completed"));
    Recover(notes, AddTask_5, false);
    Recover(notes_completed, AddTask_5, true);
}

main();