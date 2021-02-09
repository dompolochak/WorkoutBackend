const jwt = require('jsonwebtoken');
const connection = require('../Lib/Connection');

exports.generateToken = async function(prevToken, username, userInfo){
    const name = username || getUsernameFromToken(prevToken);

    if(!userInfo)
    {
        await getUserInfoByName(name)
        .then(results=>{
            userInfo = results;
        })
        .catch(()=>{return null;});
    }

    const options = {
        algorithm: process.env.ALGORITHM,
        expiresIn: process.env.EXPIRY,
        issuer: process.env.ISSUER,
        subject: userInfo.username
    };

    //first param obj is optional additional user info for cookie
    return jwt.sign({}, process.env.SECRET, options);

}

function getUserInfoByName(username){
    return new Promise((resolve,reject)=>{
        connection.query(
            `SELECT * FROM Users WHERE username = '${username}';`, 
            (error,results)=>{
                if(error||!results.length){
                    return reject();
                }
                else{
                    return resolve(results[0]);
                }
            }
        )
    });
}

function getUsernameFromToken(token){
    //we'll get there
}
