const mongoDB = require("mongodb");
const url = "mongodb://localhost:27017/";
const client = new mongoDB.MongoClient(url);

const dbConnection = async (dbName, collectioName) =>{
    let connection = await client.connect();
    let db = connection.db(dbName);
    let collection = db.collection(collectioName);
    
    return collection;
}

module.exports = {dbConnection};