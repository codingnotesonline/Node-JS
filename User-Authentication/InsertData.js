const fs = require("fs");
const MongoDBConnection = require("./MongoDBConnection");
const jwt = require("jsonwebtoken");
const secretKey = "#f&Yk!45s)(nCWd/.,ks,Oq@$__7=9.6+,.47zQA^^J814..";


const insertData = async () => {
    let result = fs.readFileSync("./data.json", "utf-8");

    let data = JSON.parse(result);

    let InternsData = await MongoDBConnection.dbConnection("Company", "InternsData");
    let PrivateKeys = await MongoDBConnection.dbConnection("Company", "PrivateKeys");


    data.forEach(async (element) =>{
        let details = {
            userName: element.userName,
            name: element.name,
            skill: element.skill
        };

        // const key = jwt.sign(details, secretKey, {expiresIn: "259200s"});
        const key = jwt.sign(details, secretKey);

        let PrivateKey = {
            userName: element.userName,
            key: key
        }

        InternsData.insertOne(element);

        PrivateKeys.insertOne(PrivateKey);
    });
}

insertData();
console.log("Data insertion done");