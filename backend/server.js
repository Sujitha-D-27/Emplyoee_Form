const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2725",
    database: "regform"

})
app.post('/create', (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const dob = req.body.dob;
    const position = req.body.position;
    const salary = req.body.salary;
    const experience = req.body.experience;
    const address = req.body.address;
    db.query('insert into employees(Name,DOB,Position,Salary,Experience,Address) values(?,?,?,?,?,?)',
        [name, dob, position, salary, experience, address], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.send("data inserted successfully!!!");
            }
        })
})

app.get('/show', (req, res) => {
    db.query('SELECT * FROM employees', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            res.status(200).json(result);
        }
    });
});



app.listen(5000, () => {
    console.log("server is running");
})



/*db.connect((err)=>{
    if(err){
        console.log("error occur"+err);
    }
    else{
        console.log("success");
    }
})
db.end();*/
