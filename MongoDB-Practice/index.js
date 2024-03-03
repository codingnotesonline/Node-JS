let connect = require("./MongoDBConnection");
let express = require("express");
let mongoDB = require("mongodb");
let app = express();

app.use(express.json());

let dbName = "Company";
let collectionName = "InternsData";

app.get("/",async (req, resp)=>{
    let connection = (await connect.dbConnection(dbName, collectionName)).find();
    let data = await connection.toArray();
    resp.send(data);
});

app.get("/name", async (req, resp)=>{
    let parameters = req.query;
    let connection = (await connect.dbConnection(dbName, collectionName)).find({name: parameters.name});
    let data = await connection.toArray();
    resp.send(data);
});



app.listen(5000);