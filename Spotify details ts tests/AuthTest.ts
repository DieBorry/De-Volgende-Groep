const axios= require( 'axios');
const express= require('express');
const app= express();
app.set('port', 3000);

const client_Id:string = "a2aab0598b1547f4b2f9fe66828e8ebc";
const client_Secret:string = "d02846da1f8d4759be3cca85d186f9db";
const redirect_Uri:string = "http://localhost:3000"
app.get('/',(req:any,res:any)=>{
    res.type('text/html');
    res.send('Hello <strong>World</strong>')
});

app.listen(app.get('port'), 
    ()=>console.log( '[server] http://localhost:' + app.get('port')));