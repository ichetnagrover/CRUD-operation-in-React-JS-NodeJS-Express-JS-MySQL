const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");


//MySQL Connection
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "str@nge@1210",
    database: "crud_contact",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        if (error) {
            res.status(500).send({ message: "Error occurred while fetching data", error: error });
        } else {
            res.status(200).send(result);
        }
    });
});

//Create new task
app.post('/insert', (req, res) => {
    const { name, email, contact } = req.body;
    const checkDuplicate = `SELECT * FROM contact_db WHERE email=?`;

    db.query(checkDuplicate, [email], (checkError, checkResult) => {
        if (checkError) {
            res.status(500).send({ message: "Error occurred while checking for duplicates", error: checkError });
        } else {
            if (checkResult.length > 0) {
                res.status(400).send({ message: "Duplicate entry already exists" });
            } else {
                const insertQuery = `INSERT INTO contact_db(name, email, contact) VALUES (?, ?, ?)`;
                db.query(insertQuery, [name, email, contact], (insertError, insertResult) => {
                    if (insertError) {
                        res.status(500).send({ message: "Error occurred while inserting data", error: insertError });
                    } else {
                        res.status(201).send({ message: 'Data added successfully.' });
                    }
                });
            }
        }
    });
});

app.get("/get/:id", (req, res) => {
    const sqlSingleData = `SELECT * FROM contact_db WHERE id=?`;
    db.query(sqlSingleData, [req.params.id], (error, result) => {
        if (error) {
            res.status(500).send({ message: "Error occurred while fetching data", error: error });
        } else {
            if (result.length > 0) {
                res.status(200).send({ message: "Data fetched successfully", data: result });
            } else {
                res.status(404).send({ message: "No record found" });
            }
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const sqlDeleteData = `DELETE FROM contact_db WHERE id=?`;
    db.query(sqlDeleteData, [req.params.id], (error, result) => {
        if (error) {
            res.status(500).send({ message: "Error occurred while deleting data", error: error });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).send({ message: "Data deleted successfully", affectedRows: result.affectedRows });
            } else {
                res.status(404).send({ message: "No record found to delete" });
            }
        }
    });
});

app.put("/update/:id", (req, res) => {
    const { name, email, contact } = req.body;
    const { id } = req.params;
    const sqlUpdateData = `UPDATE contact_db SET name=?, email=?, contact=? WHERE id=?`;
    db.query(sqlUpdateData, [name, email, contact, id], (error, result) => {
        if (error) {
            res.status(500).send({ message: "Error occurred while updating data", error: error });
        } else {
            if (result.affectedRows > 0) {
                res.status(200).send({ message: "Data updated successfully" });
            } else {
                res.status(404).send({ message: "No record found to update" });
            }
        }
    });
});


//this will get all task
app.get("/api/get/:id", (req, res) => {
    const {id} =req.params;
    const sqlGet = "SELECT * FROM contact_db Where id=?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.send(result);
        }
    });
});

//this will update task
app.put("/api/update/:id", (req, res) => {
    const {id} =req.params;
    const {name, email, contact} =req.body;
    const sqlUpdate = "UPDATE contact_db SET name=?, email=?, contact=? WHERE id=?";
    db.query(sqlUpdate,  [name, email, contact,id], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.send(result);
        }
    });
});


//Start the Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
