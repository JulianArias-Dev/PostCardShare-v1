const mongoose = require('mongoose');

const ReaccionesSchema = new mongoose.Schema({
    IdReaccion: { type: Number, required: true, unique: true, required:false },
    IdPublicacion: { type: Number, required: true },
    IdUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
    descripcion: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    Tipo: { type: mongoose.Schema.Types.ObjectId, ref: 'TipoReacciones', required: false }
});

// Antes de guardar, generar automáticamente el IdReaccion
ReaccionesSchema.pre('save', async function(next) {
    if (!this.isNew) {
        return next(); // Si no es una nueva reacción, no hacemos nada
    }
    try {
        // Obtener el último IdReaccion
        const lastReaccion = await this.constructor.findOne({}, {}, { sort: { 'IdReaccion': -1 } });
        let nextId = 1;
        if (lastReaccion && lastReaccion.IdReaccion) {
            nextId = lastReaccion.IdReaccion + 1;
        }
        this.IdReaccion = nextId; // Asignar el próximo IdReaccion
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Reacciones', ReaccionesSchema);
