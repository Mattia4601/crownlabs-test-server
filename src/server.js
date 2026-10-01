const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 8080;

const DATA_PATH = process.env.DATA_PATH || "/media/data";
const PROGRAM_PATH = `${DATA_PATH}/program.s`;

app.use(express.text());

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

// API: read file
app.get("/api/file", (req, res) => {
    fs.readFile(PROGRAM_PATH, (error, data) => {
        if (error) {
            res.status(500).send("Error reading file");
            return;
        }

        res.send(data);
    });
});

// API: write file
app.put("/api/file", (req, res) => {
    fs.writeFile(PROGRAM_PATH, req.body, (error) => {
        if (error) {
            res.status(500).send("Error writing file");
            return;
        }

        res.status(200).send("File changes saved correctly");
    });
});

// Serve Ripes WASM files
app.use(express.static("static"));

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});