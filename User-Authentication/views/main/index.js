// const butoon = document.getElementById("form-submit");
// const form = document.getElementById("form-main").onsubmit = ()=>{
//     const name = document.getElementById("exampleInputName").value;
//     const email = document.getElementById("exampleInputEmail").value;
//     const password = document.getElementById("exampleInputPassword").value;

//     console.log(name, email, password);

//     let body = {
//         name: name,
//         email: email, 
//         password: password
//     }
//     console.log(body);
//     // getData(body);
// }

const getData = async (body) => {
    let response = await fetch("http://localhost:443", {
        method: "POST",
        body: body
    });
    let data = await response.json();
    console.log(data);
    setTimeout(() => {
    }, 10000);
};

// butoon.onclick = ()=>{
//     const name = document.getElementById("exampleInputName").value;
//     const email = document.getElementById("exampleInputEmail").value;
//     const password = document.getElementById("exampleInputPassword").value;

//     console.log(name, email, password);

//     let body = {
//         name: name,
//         email: email,
//         password: password
//     }
//     console.log(body);
//     getData(body);
// };