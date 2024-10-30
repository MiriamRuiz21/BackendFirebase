const { ventas } = require("../bd/conexion");

class Venta {
    constructor(data) {
        this.id = data.id;
        this.idProducto = data.idProducto;
        this.idUsuario = data.idUsuario;
        this.fechaYHora = data.fechaYHora;
        this.status = data.status; 
    }

    set id(id) {
        this._id = id;
    }
    set idProducto(idProducto) {
            this._idProducto = idProducto;
        
    }
    set idUsuario(idUsuario) {
        this._idUsuario = idUsuario;
    }
    set fechaYHora(fechaYHora) {
        this._fechaYHora = fechaYHora;
    }
    set status(status) {
        this._status = status; 
    }

    get id() {
        return this._id;
    }
    get idProducto() {
        return this._idProducto;
    }
    get idUsuario() {
        return this._idUsuario;
    }
    get fechaYHora() {
        return this._fechaYHora;
    }
    get status() {
        return this._status; 
    }
    get getVenta() {
        const conid = {
            id: this._id,
            idProducto: this.idProducto,
            idUsuario: this.idUsuario,
            fechaYHora: this.fechaYHora,
            status: this.status 
        };
        const sinid = {
            idProducto: this.idProducto,
            idUsuario: this.idUsuario,
            fechaYHora: this.fechaYHora,
            status: this.status 
        };
        if (this.id == undefined) {
            return sinid;
        } else {
            return conid;
        }
    }
}

module.exports = Venta;
