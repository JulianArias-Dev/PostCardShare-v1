const mongoose = require('mongoose');

const NotificacionesSchema = new mongoose.Schema({
    IdNotificacion: { type: Number, required: true, unique: true },
    Destino: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true }, // Referencia al modelo Usuarios
    Descripcion: { type: String, required: true }, 
    Origen: { type: Number, required: true } // Podría ser el Id de una publicación o un mensaje del sistema como Reporte
});

module.exports = mongoose.model('Notificaciones', NotificacionesSchema);
