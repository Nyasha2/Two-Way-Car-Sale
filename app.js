"use strict";

const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.static("public"));
app.use(express.json());

const SERVER_ERROR = "There was a problem with the server";
const SERVER_ERROR_CODE = 500;
const CLIENT_ERROR = 'Student not found';
const CLIENT_ERROR_CODE = 400;
const PORT_NUMBER = 8080;

app.get("/students", async function (req, res) {
    try {
        const students = await getStudentData();
        res.json(students);
    } catch (err) {
        res.status(SERVER_ERROR_CODE).send(SERVER_ERROR);
    }
});

app.get('/students/:name', async (req, res) => {
    try {
        const students = await getStudentData();
        let student;
        students.forEach(one => {
            if (one.name.toLowerCase() === req.params.name.toLowerCase()) {
                student = one;
            }
        });
        res.json(student);
    } catch (err) {
        res.status(CLIENT_ERROR_CODE).send(CLIENT_ERROR);
    }
});

app.get("/student-names", async function (req, res) {
    try {
        const students = await getStudentData();
        let names = []
        students.forEach((student) => {
            names.push(student.name);
        })
        res.json(names);
    } catch (err) {
        res.status(SERVER_ERROR_CODE).send(SERVER_ERROR);
    }
});

const getStudentData = async () => {
    let data = await fs.promises.readFile("students/students.json", 'utf8');
    data = JSON.parse(data);
    console.log(data);
    return data;
};

const PORT = process.env.PORT || PORT_NUMBER;
app.listen(PORT);

