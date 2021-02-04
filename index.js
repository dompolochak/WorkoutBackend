const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const mysql = require('mysql');
const { request } = require('http');
const packageJson = require('./package.json');
const bcrypt = require('bcryptjs');

const doItLive=packageJson.isLive;


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

const PORT = process.env.PORT || 4000;

//start api calls
app.get("/get_workouts", (request, response) => {
    //query
    const query = 'SELECT * FROM workoutdb.Lifts';
    connection.query(query, (error,results)=>{
        if(error){
            console.log(error);
            return response.status(400).send();
        }
        else   
            return response.status(200).send(results);
    });
});


app.post("/post_workouts", (request, response) => {
    console.log(request.body.Lift_name);
    const {Lift_name, Set1, Set2, Set3, Set4, Set5, Weight1, Weight2, Weight3, Weight4, Weight5, Date} = request.body;
    //query
    const query = 'INSERT INTO workoutdb.Lifts (Lift_name, set1,set2,set3,set4,set5,weight1, weight2, weight3,weight4, weight5, Date) values ("'+ Lift_name + '",' + Set1 + ',' + Set2 + ',' + Set3 + ',' + Set4 + ',' + Set5 + ',' + Weight1 + ',' + Weight2 + ',' + Weight3 + ',' + Weight4 + ',' + Weight5 + ',"' + Date + '");';
    connection.query(query, (error,results)=>{
            if(error){
                console.log(error);
                return response.status(400).send();
            }
            else
                response.status(200).send(results);
        });
});

app.post("/delete_workout", (request,response)=>{
    const {Lift_ID}=request.body;
    const query = "DELETE FROM workoutdb.Lifts WHERE Lift_ID = " + Lift_ID;

    connection.query(query, (error,results)=>{
        if(error){
            console.log(error);
            return response.status(400).send();
        }
        else {
            console.log("success");
            return response.status(200).send();
        }
    });
});

app.post("/edit_workout", (request,response)=>{
    const {Lift_ID, Lift_name, Set1, Set2, Set3, Set4, Set5, Weight1, Weight2, Weight3, Weight4, Weight5, Date} = request.body;
    var query = "";
    if(Lift_name){
        query= "UPDATE workoutdb.Lifts SET Lift_name = '" + Lift_name + "' Where Lift_ID= "+Lift_ID;
        connection.query(query, (error,results)=>{
            if(error){
                console.log(error);
                return response.status(400).send();
            }
        });
    }
    if(Set1){
        query= "UPDATE workoutdb.Lifts SET Set1 = " + Set1 + " Where Lift_ID= "+Lift_ID;
        connection.query(query, (error,results)=>{
            if(error){
                console.log(error);
                return response.status(400).send();
            }
        });
    }
    if(Set2){
        query= "UPDATE workoutdb.Lifts SET Set2 = " + Set2 + " Where Lift_ID= "+Lift_ID;
        connection.query(query, (error,results)=>{
            if(error){
                console.log(error);
                return response.status(400).send();
            }
        });
    }
    if(Set3){
        query= "UPDATE workoutdb.Lifts SET Set3 = " + Set3 + " Where Lift_ID= "+Lift_ID;
        connection.query(query, (error,results)=>{
            if(error){
                console.log(error);
                return response.status(400).send();
            }
        });
    }
    if(Set4){
        query= "UPDATE workoutdb.Lifts SET Set4 = " + Set4 + " Where Lift_ID= "+Lift_ID;
        connection.query(query, (error,results)=>{
            if(error){
                console.log(error);
                return response.status(400).send();
            }
        });
    }
    if(Set5){
        query= "UPDATE workoutdb.Lifts SET Set5 = " + Set5 + " Where Lift_ID= "+Lift_ID;
        connection.query(query, (error,results)=>{
            if(error){
                console.log(error);
                return response.status(400).send();
            }
        });
    }
    if(Weight1){
        query= "UPDATE workoutdb.Lifts SET Weight1 = " + Weight1 + " Where Lift_ID= "+Lift_ID;
        connection.query(query, (error,results)=>{
            if(error){
                console.log(error);
                return response.status(400).send();
            }
        });
    }
    if(Weight2){
        query= "UPDATE workoutdb.Lifts SET Weight2 = " + Weight2 + " Where Lift_ID= "+Lift_ID;
        connection.query(query, (error,results)=>{
            if(error){
                console.log(error);
                return response.status(400).send();
            }
        });
    }
    if(Weight3){
        query= "UPDATE workoutdb.Lifts SET Weight3 = " + Weight3 + " Where Lift_ID= "+Lift_ID;
        connection.query(query, (error,results)=>{
            if(error){
                console.log(error);
                return response.status(400).send();
            }
        });
    }
    if(Weight4){
        query= "UPDATE workoutdb.Lifts SET Weight4 = " + Weight4 + " Where Lift_ID= "+Lift_ID;
        connection.query(query, (error,results)=>{
            if(error){
                console.log(error);
                return response.status(400).send();
            }
        });
    }
    if(Weight5){
        query= "UPDATE workoutdb.Lifts SET Weight5 = " + Weight5 + " Where Lift_ID= "+Lift_ID;
        connection.query(query, (error,results)=>{
            if(error){
                console.log(error);
                return response.status(400).send();
            }
        });
    }
    if(Date){
        query= "UPDATE workoutdb.Lifts SET Date = '" + Date + "' Where Lift_ID= "+Lift_ID;
        connection.query(query, (error,results)=>{
            if(error){
                console.log(error);
                return response.status(400).send();
            }
        });
    }
    return response.status(200).send();
})

//********************start registration ******************** */
function isUniqueEmail(email){
    return new Promise((resolve,reject)=>{
        const query = "SELECT * FROM Users WHERE email="+connection.escape(email)+";";
        connection.query(query,(error,result)=>{
            if(error)
                reject({status: 400});
            if(result.length)
                reject({status: 409, cause: "emailTaken"});
            else
                resolve();
        })
    })
}

function isUniqueUsername(username){
    return new Promise((resolve,reject)=>{
        const query = "SELECT * FROM Users WHERE username="+connection.escape(username)+";";
        connection.query(query,(error,result)=>{
            if(error)
                reject({status: 400});
            if(result.length)
                reject({status: 409, cause: "usernameTaken"});
            else
                resolve();
        })
    })
}

app.post("/register",(request,response)=>{
    const {username, email, password} = request.body;
    //await all responses from database
    Promise.all([
        isUniqueEmail(email), isUniqueUsername(username)
    ])
    .then(()=>{
        bcrypt.hash(password, 10, (error, hashPassword)=>{
            if(error)
                return response.status(400).send();
            const query = `INSERT INTO Users (username, email, password) VALUES ("${username}", "${email}", "${hashPassword}");`;
            connection.query(query, error=>{
                if(error){
                    console.log(error);
                    return response.status(400).send();
                }
                return response.status(201).send();
                //create jwt token
                // generateToken(tbd)
                // .then(token=>{
                //     if(!token)
                //         return response.status(400).send();
                //     else//TODO: create cookie and return
                //         return response.status(201).send();
                // })
                // .catch();
            });
        });
    })
    .catch(error=>{
        return response.status(error.status).send({cause: error.cause});
    });

})

//end api calls
//starting server
app.listen(PORT, () => {
    console.log("Listening to " + PORT);
});
