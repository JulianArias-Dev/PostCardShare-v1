const mongoose = require('mongoose');

const PublicacionesSchema = new mongoose.Schema({
    IdPublicacion: { type: Number, unique: true },
    Usuario: { type:mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: false },
    imagen: { type: String, required: true },
    descripcion: { type: String, required: true },
    calificacion: { type: Number, required: true },
    lugar: { type: Number, ref: 'Lugares', required: true },
    fecha: { type: Date, default: Date.now },
    reportada: { type: Boolean, default: false },
    reportes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reportes' }],
    etiquetas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Etiquetas' }],
    likes: { type: Number, default: 0 }
});

// Antes de guardar, generamos el IdPublicacion
PublicacionesSchema.pre('save', async function(next) {
    if (!this.isNew) {
        return next(); // Si no es una nueva publicación, no hacemos nada
    }
    try {
        // Obtener el último IdPublicacion
        const lastPublicacion = await this.constructor.findOne({}, {}, { sort: { 'IdPublicacion': -1 } });
        let nextId = 1;
        if (lastPublicacion && lastPublicacion.IdPublicacion) {
            nextId = lastPublicacion.IdPublicacion + 1;
        }
        this.IdPublicacion = nextId; // Asignar el próximo IdPublicacion
        next();
    } catch (error) {
        next(error);
    }
});
module.exports = mongoose.model('Publicaciones', PublicacionesSchema);
