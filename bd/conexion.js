const admin = require("firebase-admin");
const keys  = require("../Keys.json");
admin.initializeApp({
    credential:admin.credential.cert(keys)
})

const proyecto=admin.firestore()
const usuarios=proyecto.collection("Usuarios");
const productos=proyecto.collection("Productos");
const ventas=proyecto.collection("Ventas");
//console.log(productos);
//console.log(usuarios);
//console.log(ventas);

module.exports={usuarios , productos, ventas}