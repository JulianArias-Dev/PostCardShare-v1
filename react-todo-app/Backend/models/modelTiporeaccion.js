const mongoose = require('mongoose');

const TiporeaccionSchema = new mongoose.Schema({
    IdTipo: { type: Number, required: true, unique: true },
    Nombre: { type: String, required: true }
});

module.exports = mongoose.model('TipoReacciones', TiporeaccionSchema);
