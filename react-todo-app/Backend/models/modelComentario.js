const mongoose = require('mongoose');

const ComentariosSchema = new mongoose.Schema({
  IdComentario: { type: Number, required: true, unique: true }, // ID único para el comentario
  Comentario: { type: String, required: true, trim: true }, // trim para eliminar espacios en blanco
  IdUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true }, // Referencia al modelo Usuario
  IdPublicacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Publicaciones', required: true }, // Referencia al modelo Publicaciones
  Fecha: { type: Date, default: Date.now }
}, { timestamps: true }); // timestamps para createdAt y updatedAt

module.exports = mongoose.model('Comentarios', ComentariosSchema);

