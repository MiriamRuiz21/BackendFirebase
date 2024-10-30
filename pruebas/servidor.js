const express = require("express");
require("dotenv").config();
const app=express();

//middleware
var saludo=(req,res,next)=>{
    console.log("Programa Cargando...");
    next();    
}

app.use(saludo);

app.get("/",saludo,(req,res)=>{
    res.send("hola mundo")
})


app.get("/home",(req,res)=>{
    res.send("Estas en home")
})


const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log("Servidor en http://localhost"+port);
}); 