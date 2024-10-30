var rutas = require("express").Router();
//var {Router} = require("express");
var {mostrarUsuarios, nuevoUsuario, borrarUsuario, buscarPorID, editarUsuarios } = require("../bd/usuariosBD");

rutas.get("/", async(req,res)=>{
    //res.send("hola estas en raiz");
    var usariosValidos= await mostrarUsuarios();
    //console.log(usuariosValidos);
    res.json(usuariosValidos);
});

rutas.get("/mostrarUsuarios", async (req, res) => {
    var usuarioValidos = await mostrarUsuarios();
    res.json(usuarioValidos);
});

rutas.get("/buscarPorId/:id",async(req,res)=>{
    var usuarioValido = await buscarPorID(req.params.id); //porque llega por url
    res.json(usuarioValido);
});

rutas.delete("/borrarUsuario/:id",async(req,res)=>{
    var usuarioBorrado = await borrarUsuario(req.params.id); 
    res.json(usuarioBorrado);
});

rutas.post("/nuevoUsuario",async(req,res)=>{
    var usuarioValido= await nuevoUsuario(req.body);
    res.json(usuarioValido);
})

rutas.put("/editarUsuario/:id", async (req, res) => {
    var usuarioEditado = await editarUsuarios(req.params.id, req.body);
    res.json(usuarioEditado);
});

module.exports=rutas;