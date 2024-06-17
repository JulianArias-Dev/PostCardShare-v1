const mongoose = require('mongoose');

const RolesSchema = new mongoose.Schema({
    IdRol: { type: Number, required: true, unique: true },
    NombreRol: { type: String, required: true }
});

module.exports = mongoose.model('Roles', RolesSchema);
