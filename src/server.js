const express = require('express');
const fs = require("fs");
const cors = require("cors");
const app = express();

const PORT = 8080;
app.use(express.text());
app.use(cors());
console.log("CORS middleware loaded");

app.get("/", (req,res)=>{
    res.send("Crownlabs test server");
});

app.listen(PORT, ()=>{
    console.log(`Server listening on http://localhost:${PORT}`);
});

app.get("/api/file", (req,res)=>{
    // res.send("API file works!");
    fs.readFile('volume/program.s', (error, data)=>{
        if (error){
            throw error;
        }
        res.send(data);
    });
});

app.put('/api/file', (req,res)=>{
    fs.writeFile('volume/program.s', req.body, (error) =>{
        if (error){
            res.status(500).send("Error writing file");
            return;
        }
        res.status(200).send("File changes saved correctly");
    });
});