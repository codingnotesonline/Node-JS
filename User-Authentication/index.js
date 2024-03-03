const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const multer = require("multer");
const os = require("os");
const fs = require("fs");
const path = require("path");
const hbs = require("hbs");
const jwt = require("jsonwebtoken");
const secretKey = "#f&Yk!45s)(nCWd/.,ks,Oq@$__7=9.6+,.47zQA^^J814..";
const port = process.env.PORT || 5000;

const MongoDbConnection = require("./MongoDBConnection");

const app = express();

// const Rules = mongoose.Schema({
//     name: String,
//     age: Number,
//     educationLevel: Number,
//     skill: String
// });

// const url = "mongodb://localhost:27017";

// const connection = async ()=>{
//     await mongoose.connect(url);
// }

// mongoose.model("Company", Rules, "InternsData", ()=>{

// });

const upload = multer({
    storage: multer.diskStorage({
        destination: function(req, file, callback) {
            callback(null, "./views/uploads");
        },
        filename: function(req, file, callback) {
            callback(null, file.fieldname + "_" + req.body.userName + "_" + req.body.skill + ".pdf");
            // console.log(file.fieldname, file.filename);
        }
    })
}).single("cv");


const contraints = (req, resp, next) => {
    if (!req.query.age) {
        resp.send('<h1 style="text-align: center;">Please provide age</h1>');
    }
    else if (req.query.age < 18) {
        resp.send('<h1 style="text-align: center;">Only 18+ can access this site</h1>');
    }
    else {
        next();
    }
}


const extractData = async (database, collection) => {
    let result = await MongoDbConnection.dbConnection(database, collection);
    let response = await result.find().toArray();
    return response;
}

const extractKey = async (database, collection, data) => {
    let result = await MongoDbConnection.dbConnection(database, collection);
    let response = await result.find(data).toArray();
    return response[0].key;
}

const insertData = async (database, collection, newData) => {
    let result = await MongoDbConnection.dbConnection(database, collection);
    let response = await result.insertOne(newData);
    // return response;
}

const updateData = async (database, collection, currentData, newData) => {
    let result = await MongoDbConnection.dbConnection(database, collection);
    let response = await result.updateOne(currentData, {$set: newData});
    return response;
}

const deleteData = async (database, collection, data) => {
    let result = await MongoDbConnection.dbConnection(database, collection);
    let response = await result.deleteOne(data);
    return response;
}
// check why validateData function does not await while calling it
const validateData = async (database, collection, data) => {
    let result = await MongoDbConnection.dbConnection(database, collection);
    let response = await result.find(data).count();
    return response;
}

// app.use(contraints);
// app.use(express.urlencoded({
//     extended: true,
//     limit: 10000,
//     parameterLimit: 5
// }));

app.use(express.json());

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"));

app.get("/", (req, resp) => {
    resp.render(path.join(__dirname, "views/main/index"), {
        username: "Admin"
    });

});

app.post("/insertdata", upload, (req, resp) => {
    console.log(req.body);

    let acknowledgement = false;

    let keyData = {
        userName: req.body.userName,
        skill: req.body.skill
    };

    // const key = jwt.sign(keyData , secretKey, {expiresIn: "259200s"});
    const key = jwt.sign(keyData , secretKey);

    let PrivateKey = {
        userName: req.body.userName,
        key: key
    }

    if((validateData("Company", "InternsData", keyData)) == 0){
        insertData("Company", "InternsData", req.body);
        insertData("Company", "PrivateKeys", PrivateKey);

        acknowledgement = true;
    }

    // resp.redirect("/admin");

    let response = {
        key: key,
        url: `http://localhost:${port}/admin`,
        acknowledgement: acknowledgement
    };

    resp.header({ "Content-type": "application/json" });

    resp.json(response);
});

app.get("/update", (req, resp) => {
    resp.render(path.join(__dirname, "views/main/update"), {
        username: "Admin"
    });
});

app.put("/updatedata", async (req, resp) => {
    console.log(req.body);

    let acknowledgement = false;

    let key = req.body.key.loginKey;
    let authenticate = jwt.verify(key, secretKey);

    let verify = {
        userName: authenticate.userName,
        skill: authenticate.skill
    }

    let verifyKey = {
        key: key
    }

    if((validateData("Company", "InternsData", verify) != 0) && (validateData("Company", "PrivateKeys", verifyKey) != 0)){
        let result = await updateData("Company", "InternsData", req.body.current, req.body.update);
        if(result.matchedCount != 0){
            acknowledgement = true;
        }
    }

    // send data and check it

    let response = {
        url: `http://localhost:${port}/admin`,
        acknowledgement: acknowledgement
    };

    resp.header({ "Content-type": "application/json" });

    resp.json(response);
});

app.get("/delete", (req, resp) => {
    resp.render(path.join(__dirname, "views/main/delete"), {
        username: "Admin"
    });
});

app.delete("/deletedata", async (req, resp) => {
    console.log(req.body);

    let acknowledgement = false;

    // send data and check it

    let key = req.body.loginKey;
    let authenticate = jwt.verify(key, secretKey);

    let verify = {
        userName: authenticate.userName,
        skill: authenticate.skill
    }

    let verifyKey = {
        key: key
    }

    if((validateData("Company", "InternsData", verify) != 0) && (validateData("Company", "PrivateKeys", verifyKey) != 0)){
        let data = {
            userName: authenticate.userName,
            skill: authenticate.skill
        }

        let result = await deleteData("Company", "InternsData", data);
        if(result.deletedCount != 0){
            acknowledgement = true;
        }
    }

    let response = {
        url: `http://localhost:${port}/admin`,
        acknowledgement: acknowledgement
    };

    resp.header({ "Content-type": "application/json" });

    resp.json(response);
});

app.get("/authenticate", (req, resp) => {
    resp.render(path.join(__dirname, "views/main/authenticate"), {
        username: "Admin"
    });
});

app.post("/validatedata", async (req, resp) => {
    console.log(req.body);

    let acknowledgement = false;
    let loginKey;

    let key = req.body.loginKey;

    let verify, dataResult, keyResult;


    if(key == undefined || key == "undefined"){
        keyResult = 0;   
        verify = {
            userName: req.body.userName,
            skill: req.body.skill
        }

        dataResult = await validateData("Company", "InternsData", verify);

        if(dataResult != 0){
            loginKey = await extractKey("Company", "PrivateKeys", {userName: verify.userName});
        }
    }
    else{
        let authenticate = jwt.verify(key, secretKey);

        verify = {
            userName: authenticate.userName,
            skill: authenticate.skill
        }

        let verifyKey = {
            key: key
        }

        dataResult = await validateData("Company", "InternsData", verify);

        keyResult = await validateData("Company", "PrivateKeys", verifyKey);

        if(dataResult != 0 && keyResult != 0){
            loginKey = await extractKey("Company", "PrivateKeys", {userName: verify.userName});
        }        
    }


    // it should be properly checked, like using password
    if(dataResult != 0 || keyResult != 0){
        acknowledgement = true;
    }
    else{
        loginKey = "undefined";
        console.log("defined the loginkey as undefined");
    }

    let response = {
        url: `http://localhost:${port}/admin`,
        loginKey: loginKey,
        acknowledgement: acknowledgement
    };

    resp.header({ "Content-type": "application/json" });

    resp.json(response);
});

app.get("/admin", (req, resp) => {
    resp.render(path.join(__dirname, "views/main/admin"), {
        username: "Admin"
    });
});

app.post("/showdata", async (req, resp) => {
    console.log(req.body);
    // perform proper verification
    let key = req.body.loginKey;

    let authenticate = jwt.verify(key, secretKey);

    let verify = {
        userName: authenticate.userName,
        skill: authenticate.skill
    }

    // send data and check it
    let dataResult = validateData("Company", "InternsData", verify);

    let keyResult = validateData("Company", "PrivateKeys", req.body);
    
    if(dataResult != 0 && keyResult != 0){
        let data = await extractData("Company", "InternsData");
        // fs.writeFileSync("./data.json", JSON.stringify(data));
        
        resp.json(data);
    }
    else{
        app.render(path.join(__dirname, "views/main/authenticate"), {
            username: "Admin"
        });
    }
});

app.listen(port); 