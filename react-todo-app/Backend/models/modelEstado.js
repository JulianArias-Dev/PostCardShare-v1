const mongoose = require('mongoose');

const EstadoSchema = new mongoose.Schema({
    IdEstado: { type: Number, unique: true },
    Nombre: { 
        type: String, 
        enum: ['Activo', 'Inactivo', 'Reportado'], 
        required: true 
    },
    Descripcion: { type: String, required: true }
});

EstadoSchema.pre('save', async function(next) {
    try {
        if (!this.isNew) {
            return next(); // Si no es un nuevo estado, no hacemos nada
        }
        // Obtener el último IdEstado y generar el siguiente
        const lastEstado = await this.constructor.findOne({}, {}, { sort: { 'IdEstado': -1 } });
        let nextId = 1;
        if (lastEstado) {
            nextId = lastEstado.IdEstado + 1;
        }
        this.IdEstado = nextId; // Asignar el próximo IdEstado
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Estados', EstadoSchema);
