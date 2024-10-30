var crypto = require("crypto");

function encriptarPassword(password){
    var salt=crypto.randomBytes(32).toString("hex");
    //console.log(salt);
    const hash = crypto.scryptSync(password,salt,100000,64,"sha512").toString("hex");
    //console.log(hash);
    return {salt,
            hash
    }
} 

function validarPassword(password, hash, salt){
    const hashValidar = crypto.scryptSync(password,salt,100000,64,"sha512").toString("hex");
    return hashValidar==hash;
    

}



function usuarioAutorizado(){
    var autorizado=false;
    return autorizado;
}

function productoAutorizado() {
    var autorizado = false;
    return autorizado;
}

function adminAutorizado(){
    var autorizado=false;
    return autorizado;
}

//encriptarPassword("ola");
module.exports={
encriptarPassword,
validarPassword,
usuarioAutorizado,
productoAutorizado,
adminAutorizado

}