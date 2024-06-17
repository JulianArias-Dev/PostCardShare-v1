const mongoose = require('mongoose');

const LugaresSchema = new mongoose.Schema({
    IdLugar: { type: Number, required: true, unique: true },
    Ciudad: { type: Number, required: true },  // Cambiado a Number
    Nombre: { type: String, required: true },
    Actividad: { type: String, required: true },
    Calificacion: { type: Number, required: true }
});

module.exports = mongoose.model('Lugares', LugaresSchema);
