// const main_1 = require("./main_1");
const fileSystem = require("fs");
// const http = require("http");
const path = require("path");
const express = require("express");
const dirPath = path.join(__dirname, "public");
const mongoDB = require("mongodb");
const app = express();

// app.use(express.static(dirPath));

// V.VIP:
// do not write response.end() while using with express app functions
// write response.end() while using with http createServer function

app.get("/", (request, response)=>{
    response.sendFile(`${dirPath}/index.html`);
});

app.get("/notes-app", (request, response)=>{
    response.sendFile(`${dirPath}/notes-app.html`);
});

app.get("*", (request, response)=>{
    fileSystem.appendFileSync(path.join(__dirname, "unknownRequest.txt"), `${request.url}\n`);
    response.sendFile(`${dirPath}/404.html`);
});


app.listen(443);

// http.createServer((request, response)=>{
//     console.log(request.url);
//     response.writeHead(201, {'Content-type': 'application/json'});
//     response.write(JSON.stringify(main_1));
//     response.end();
// }).listen(443);
