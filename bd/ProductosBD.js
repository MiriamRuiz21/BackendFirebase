const productosBD = require("./conexion").productos;
const Producto = require("../modelos/ProductoModelo");

function validarDatos(producto) {
    return producto.nombreProducto != undefined && producto.cantidad != undefined && producto.precio != undefined;
}

async function mostrarProductos() {
    const productos = await productosBD.get();
    const productosValidos = [];
    productos.forEach(producto => {
        const producto1 = new Producto({ id: producto.id, ...producto.data() });

        if (validarDatos(producto1.getProducto)) {
            productosValidos.push(producto1.getProducto);
        }
    });
    return productosValidos;
}

async function buscarPorID(id) {
    const producto = await productosBD.doc(id).get();
    const producto1 = new Producto({ id: producto.id, ...producto.data() });
    let productoValido;
    if (validarDatos(producto1.getProducto)) {
        productoValido = producto1.getProducto;
    }
    return productoValido;
}

async function nuevoProducto(data) {
    const producto1 = new Producto(data);
    let productoValido = false;
    if (validarDatos(producto1.getProducto)) {
        await productosBD.doc().set(producto1.getProducto);
        productoValido = true;
    }
    return productoValido;
}

async function borrarProducto(id) {
    const productoValido = await buscarPorID(id);
    let productoBorrado = false;
    if (productoValido) {
        await productosBD.doc(id).delete();
        productoBorrado = true;
    }
    return productoBorrado;
}

async function editarProducto(id, nuevosDatos) {
    const productoID = await buscarPorID(id);
    if (!productoID) return false;
    Object.assign(productoID, nuevosDatos); //copia todas las propiedades enumerables de uno o más objetos fuente a un objeto destino.
    const productoActualizado = new Producto(productoID);
    if (validarDatos(productoActualizado.getProducto)) {
        await productosBD.doc(id).set(productoActualizado.getProducto);
        return true;
    }
    return false;
}

module.exports = {
    mostrarProductos,
    nuevoProducto,
    borrarProducto,
    buscarPorID,
    editarProducto
};
