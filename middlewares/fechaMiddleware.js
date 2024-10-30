function agregarFecha(req, res, next) {
    const fechaActual = new Date();
    req.body.fechaYHora = fechaActual.toISOString(); 
    next(); 
}

module.exports = agregarFecha;
