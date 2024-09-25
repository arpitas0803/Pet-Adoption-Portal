//Import the express dependency
const express = require('express'); 
const bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');

//Instantiate an express app, the main work horse of this server
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: 'pet_adoption'
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

//Save the port number where your server will be listening
const port = 5000;                  

//Idiomatic expression in express to route and respond to a client request
app.post('/register', (req, res) => {
    const { name, email, phone, pet, message } = req.body;

    // Insert data into the database
    const sql = 'INSERT INTO pet_adoption_requests (name, email, phone, pet, message) VALUES (?, ?, ?, ?, ?)';
    con.query(sql, [name, email, phone, pet, message], (err, result) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({ message: 'Error storing data' });
        }
        res.status(201).json({ message: 'Data stored successfully', id: result.insertId });
    });
});

//server starts listening for any attempts from a client to connect at port: {port}
app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});