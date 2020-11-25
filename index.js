const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'workoutdb.cqhauiwyqpbl.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'watermelon',
    database: 'workoutdb'
});

const app = express();

app.use(helmet());//enhanced security

app.use(bodyParser.json());

app.use(cors());

//start api calls
app.get("/get_workouts", (request, response) => {
    //query
    const query = 'SELECT * FROM workoutdb.Lifts';
    connection.query(query, (error,results) => {
        if(error)
        {
            console.log(error);
            return response.status(400).send();
        }
        
        response.status(200).send(results);
    });
});

app.post("/post_workouts", (request, response) => {
    console.log(request.body.Lift_name);
    const {Lift_name, Set1, Set2, Set3, Set4, Set5, Weight1, Weight2, Weight3, Weight4, Weight5, Date} = request.body;
   
    //query
    const query = 'INSERT INTO workoutdb.Lifts (Lift_name, set1,set2,set3,set4,set5,weight1, weight2, weight3,weight4, weight5, Date) values ("'+ Lift_name + '",' + Set1 + ',' + Set2 + ',' + Set3 + ',' + Set4 + ',' + Set5 + ',' + Weight1 + ',' + Weight2 + ',' + Weight3 + ',' + Weight4 + ',' + Weight5 + ',"' + Date + '");';
    console.log("Inside of post");
    connection.query(query, (error,results) => {
        if(error)
        {
            console.log(error);
            return response.status(400).send();
        }
        
        response.status(200).send(results);
    });
});

app.post("/delete_workout", (request,response)=>{
    const {Lift_ID}=request.body;
    const query = "DELETE FROM workoutdb.Lifts WHERE Lift_ID = " + Lift_ID;

    connection.query(query, (error,results) => {
        if(error)
        {
            console.log(error);
            return response.status(400).send();
        }
        
        response.status(200).send(results);
    });
});

//end api calls
//starting server
app.listen(4000, () => {
    console.log("Listening on port 4000");
});
