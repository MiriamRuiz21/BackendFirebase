const usuariosBD = require("./conexion").usuarios;
const Usuario = require("../modelos/UsuarioModelo");
const { encriptarPassword, validarPassword, usuarioAutorizado, adminAutorizado}=require("../middlewares/funcionesPassword");

function validarDatos(usuario){
    var valido = false;
    if(usuario.nombre!=undefined && usuario.usuario!=undefined && usuario.password!=undefined){
        valido=true;
    }
    return valido;
}


async function mostrarUsuarios(){
    //sale de java y entra a firebase para los datos
    const usuarios= await usuariosBD.get();
    //console.log(usuarios);
    usuariosValidos=[];
    usuarios.forEach(usuario => {
        const usuario1=new Usuario({id:usuario.id,...usuario.data()}); //spread

        if(validarDatos(usuario1.getUsuario)){
            usuariosValidos.push(usuario1.getUsuario);
        }
        //listaUsuarios.push({id:usuario.id,...usuario.data()});
    });
    
    //console.log(usuariosValidos);
    return usuariosValidos;
}

async function buscarPorID(id) {
    //obtener el id del usuario
    const usuario=await usuariosBD.doc(id).get();
    const usuario1=new Usuario({id:usuario.id,...usuario.data()});
    var usuarioValido;
    if(validarDatos(usuario1.getUsuario)){
        usuarioValido=usuario1.getUsuario;
    }
    console.log(usuarioValido);
    return usuarioValido;
    //console.log(usuario1.getUsuario); //get usuario entrega los datos
}

async function nuevoUsuario(data) {
const {salt,hash}=encriptarPassword(data.password);
    data.password=hash;
    data.salt=salt;
    data.tipoUsuario="usuario";
    const usuario1=new Usuario(data);
    //console.log(usuario1.getUsuario); //saber si llega la informacion
    var usuarioValido=false;
    if(validarDatos(usuario1.getUsuario)){
        await usuariosBD.doc().set(usuario1.getUsuario);
        usuarioValido=true;
    }
    return usuarioValido
}

async function borrarUsuario(id) {
    var usuarioValido = await buscarPorID(id);
    var usuarioBorrado = false;
    if (usuarioValido){
        await usuariosBD.doc(id).delete();
        usuarioBorrado = true;
    }
    return usuarioBorrado;
}

async function editarUsuarios(id, nuevosDatos) {
    // Obtiene el usuario actual a través de su ID
    const usuarioExistente = await buscarPorID(id);
    if (!usuarioExistente) return false; // Retorna falso si el usuario no existe

    // Si se ha proporcionado un nuevo password, lo encripta
    if (nuevosDatos.password) {
        const { salt, hash } = encriptarPassword(nuevosDatos.password);
        nuevosDatos.password = hash;
        nuevosDatos.salt = salt;
    } else {
        // Si no se proporciona un nuevo password, mantiene el hash y salt actuales
        nuevosDatos.password = usuarioExistente.password;
        nuevosDatos.salt = usuarioExistente.salt;
    }

    // Asigna los nuevos datos al objeto existente
    Object.assign(usuarioExistente, nuevosDatos);
    const usuarioActualizado = new Usuario(usuarioExistente);

    // Valida los datos antes de actualizar en la base de datos
    if (validarDatos(usuarioActualizado.getUsuario)) {
        await usuariosBD.doc(id).set(usuarioActualizado.getUsuario);
        return true;
    }
    return false; // Retorna falso si los datos no son válidos
}



module.exports={
    mostrarUsuarios, 
    nuevoUsuario, 
    borrarUsuario, 
    buscarPorID,
    editarUsuarios
}
