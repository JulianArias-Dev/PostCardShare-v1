const mongoose = require('mongoose');

const EtiquetasSchema = new mongoose.Schema({
    IdEtiqueta: { type: Number, required: true, unique: true },
    Descripcion: { type: String, required: true },
    Nombre: { type: String, required: true },
    Actividad: { type: Number, required: true } // Es un nombre general de una actividad
});

module.exports = mongoose.model('Etiquetas', EtiquetasSchema);
