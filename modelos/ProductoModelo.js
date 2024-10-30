const { productos } = require("../bd/conexion");

class Producto {
    constructor(data) {
        this.id = data.id;
        this.nombreProducto = data.nombreProducto;
        this.cantidad = data.cantidad;
        this.precio = data.precio;
    }

    set id(id) {
        this._id = id;
    }
    set nombreProducto(nombreProducto) {
        const nombreRegex = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (nombreRegex.test(nombreProducto)) {
            this._nombreProducto = nombreProducto;
        }
    }
    set cantidad(cantidad) {
        this._cantidad = cantidad;
    }
    set precio(precio) {
        this._precio = precio;
    }

    get id() {
        return this._id;
    }
    get nombreProducto() {
        return this._nombreProducto;
    }
    get cantidad() {
        return this._cantidad;
    }
    get precio() {
        return this._precio;
    }
    get getProducto() {
        const conid = {
            id: this._id,
            nombreProducto: this.nombreProducto,
            cantidad: this.cantidad,
            precio: this.precio
        };
        const sinid = {
            nombreProducto: this.nombreProducto,
            cantidad: this.cantidad,
            precio: this.precio
        };
        if (this.id == undefined) {
            return sinid;
        } else {
            return conid;
        }
    }
}

module.exports = Producto;
