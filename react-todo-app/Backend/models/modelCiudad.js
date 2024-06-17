const mongoose = require('mongoose');

const CiudadesSchema = new mongoose.Schema({
    IdCiudad: { type: Number, unique: true, },
    Nombre: { type: String, required: true }
});

CiudadesSchema.pre('save', async function(next) {
    if (!this.isNew) {
        return next(); // Si no es una nueva ciudad, no hacemos nada
    }
    try {
        // Obtener el último IdCiudad
        const lastCiudad = await this.constructor.findOne({}, {}, { sort: { 'IdCiudad': -1 } });
        let nextId = 1;
        if (lastCiudad) {
            nextId = lastCiudad.IdCiudad + 1;
        }
        this.IdCiudad = nextId; // Asignar el próximo IdCiudad
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Ciudades', CiudadesSchema);
