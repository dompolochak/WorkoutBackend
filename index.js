/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'workoutsqlserver.database.windows.net',
    user: 'dompolochak',
    password: '170240Dc',
    database: 'workoutdb',
    ssl: true,
    port: '1433'
});

connection.connect((error) =>{
    if(error)
    {
        //console.log(error);
    }
    else
        console.log("WOOOOOOOOOOOOOOO");
});

const app = express();

app.use(helmet());//enhanced security

app.use(bodyParser.json());

app.use(cors());

//start api calls
app.get("/get_workouts", (request, response) => {
    //query
    const query = 'SELECT * FROM [dbo].[Lifts]';
    connection.query(query, (error,results) => {
        if(error)
        {
           // console.log(error);
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












/*
*/

const { Connection, Request } = require("tedious");

// Create connection to database
const config = {
  authentication: {
    options: {
      userName: "dompolochak", // update me
      password: "170240Dc" // update me
    },
    type: "default"
  },
  server: "workoutsqlserver.database.windows.net", // update me
  options: {
    database: "workoutdb", //update me
    encrypt: true
  }
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

function queryDatabase() {
  console.log("Reading rows from the Table...");

  // Read all rows from table
  const request = new Request(
    `SELECT * FROM [dbo].[Lifts]`,
    (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    }
  );

  request.on("row", columns => {
    columns.forEach(column => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });

  connection.execSql(request);
}


