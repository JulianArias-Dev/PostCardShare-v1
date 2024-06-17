const Comentarios = require('../models/modelComentario');
const Usuarios = require('../models/modelUsuario');
const Publicaciones = require('../models/modelPublicacion');

// Crear un nuevo comentario
exports.createComentario = async (req, res) => {
  try {
    const { IdComentario, Comentario, IdUsuario, IdPublicacion } = req.body;

    // Verificar si el usuario proporcionado existe
    const existingUsuario = await Usuarios.findOne({ IdUsuario });
    if (!existingUsuario) {
      return res.status(400).json({ message: 'El usuario proporcionado no existe' });
    }

    // Verificar si la publicación proporcionada existe
    const existingPublicacion = await Publicaciones.findOne({ IdPublicacion });
    if (!existingPublicacion) {
      return res.status(400).json({ message: 'La publicación proporcionada no existe' });
    }

    // Verificar si el comentario ya existe
    const existingComentario = await Comentarios.findOne({ IdComentario });
    if (existingComentario) {
      return res.status(400).json({ message: 'Ya existe un comentario con este IdComentario' });
    }

    const comentario = new Comentarios({ IdComentario, Comentario, IdUsuario, IdPublicacion });
    await comentario.save();
    res.status(201).json({ message: 'Comentario creado exitosamente', comentario });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el comentario', error: error.message });
  }
};

// Obtener todos los comentarios
exports.getComentarios = async (req, res) => {
  try {
    const comentarios = await Comentarios.find().populate('IdUsuario').populate('IdPublicacion');
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los comentarios', error: error.message });
  }
};

// Actualizar un comentario existente
exports.updateComentario = async (req, res) => {
  try {
    const { IdComentario } = req.params;
    const { Comentario } = req.body;

    const updatedComentario = await Comentarios.findOneAndUpdate({ IdComentario }, { Comentario }, { new: true });
    res.status(200).json({ message: 'Comentario actualizado exitosamente', comentario: updatedComentario });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el comentario', error: error.message });
  }
};

// Eliminar un comentario existente
exports.deleteComentario = async (req, res) => {
  try {
    const { IdComentario } = req.params;
    await Comentarios.findOneAndDelete({ IdComentario });
    res.status(200).json({ message: 'Comentario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el comentario', error: error.message });
  }
};
