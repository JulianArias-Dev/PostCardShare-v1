const Publicacion = require('../models/modelPublicacion');

// Crear una nueva publicación
exports.createPublicacion = async (req, res) => {
  const { Usuario, imagen, descripcion, calificacion, lugar, reportada, reportes, etiquetas } = req.body;

  try {
    const newPublicacion = new Publicacion({ Usuario, imagen, descripcion, calificacion, lugar, reportada, reportes, etiquetas });
    await newPublicacion.save();
    res.status(201).json(newPublicacion);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Función para obtener la cantidad de likes de una publicación
exports.obtenerLikes = async (req, res) => {
  const { id } = req.params;

  try {
    const publicacion = await Publicacion.findOne({ IdPublicacion: id });
    if (!publicacion) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    res.status(200).json({ likesCount: publicacion.likes }); // Cambiado a 'likes'
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};


// Obtener todas las publicaciones
exports.getPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.find();
    res.status(200).json(publicaciones);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.getPublicacionesByUsuarioId = async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;
    const publicaciones = await Publicacion.find({ _id: idUsuario }); // Cambia de Usuario a _id

    res.json(publicaciones);
  } catch (error) {
    console.error('Error al obtener las publicaciones del usuario:', error);
    res.status(500).json({ message: 'Error al obtener las publicaciones del usuario' });
  }
};

// Obtener una publicación por su IdPublicacion
exports.getPublicacionById = async (req, res) => {
  const { id } = req.params;

  try {
    const publicacion = await Publicacion.findOne({ IdPublicacion: id });
    if (!publicacion) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }
    res.status(200).json(publicacion);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Actualizar una publicación existente
exports.updatePublicacion = async (req, res) => {
  const { id } = req.params;
  const { Usuario, imagen, descripcion, calificacion, lugar, reportada, reportes, etiquetas } = req.body;

  try {
    const existingPublicacion = await Publicacion.findOne({ IdPublicacion: id });
    if (!existingPublicacion) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    const updatedPublicacion = await Publicacion.findOneAndUpdate({ IdPublicacion: id }, { Usuario, imagen, descripcion, calificacion, lugar, reportada, reportes, etiquetas }, { new: true });
    res.status(200).json(updatedPublicacion);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Eliminar una publicación existente
exports.deletePublicacion = async (req, res) => {
  const { id } = req.params;

  try {
    const existingPublicacion = await Publicacion.findOne({ IdPublicacion: id });
    if (!existingPublicacion) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    await Publicacion.findOneAndDelete({ IdPublicacion: id });
    res.status(200).json({ message: 'Publicación eliminada exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};
