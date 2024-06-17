const Publicacion = require('../models/modelPublicacion');
const Reaccion = require('../models/modelReaccion');

// Crear una nueva reaccion
exports.createReaccion = async (req, res) => {
  const { IdPublicacion, IdUsuario, descripcion, Tipo } = req.body; // No enviar IdReaccion desde el cliente

  try {
    const newReaccion = new Reaccion({ IdPublicacion, IdUsuario, descripcion, Tipo });
    await newReaccion.save();
    res.status(201).json(newReaccion);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.registrarLike = async (req, res) => {
  const { publicacionId, usuarioId } = req.params;

  try {
    // Verificar si el usuario ya ha reaccionado a esta publicación
    const existingReaccion = await Reaccion.findOne({ IdPublicacion: publicacionId, IdUsuario: usuarioId });
    if (existingReaccion) {
      return res.status(400).json({ message: 'El usuario ya ha reaccionado a esta publicación' });
    }

    // Registrar la nueva reacción
    const nuevaReaccion = new Reaccion({ IdPublicacion: publicacionId, IdUsuario: usuarioId, tipo: 'like' });
    await nuevaReaccion.save();

    // Incrementar el contador de likes en la publicación correspondiente
    await Publicacion.findByIdAndUpdate(publicacionId, { $inc: { likes: 1 } }); // Cambiado a 'likes'

    res.status(201).json({ message: 'Reacción registrada exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};


// Obtener todas las reacciones
exports.getReacciones = async (req, res) => {
  try {
    const reacciones = await Reaccion.find();
    res.status(200).json(reacciones);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Obtener una reacción por su IdReaccion
exports.getReaccionById = async (req, res) => {
  const { id } = req.params;

  try {
    const reaccion = await Reaccion.findOne({ IdReaccion: id });
    if (!reaccion) {
      return res.status(404).json({ message: 'Reacción no encontrada' });
    }
    res.status(200).json(reaccion);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Actualizar una reacción existente
exports.updateReaccion = async (req, res) => {
  const { id } = req.params;
  const { Publicacion, Usuario, descripcion, fecha, Tipo } = req.body;

  try {
    const existingReaccion = await Reaccion.findOne({ IdReaccion: id });
    if (!existingReaccion) {
      return res.status(404).json({ message: 'Reacción no encontrada' });
    }

    const updatedReaccion = await Reaccion.findOneAndUpdate({ IdReaccion: id }, { Publicacion, Usuario, descripcion, fecha, Tipo }, { new: true });
    res.status(200).json(updatedReaccion);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Eliminar una reacción existente
exports.deleteReaccion = async (req, res) => {
  const { id } = req.params;

  try {
    const existingReaccion = await Reaccion.findOne({ IdReaccion: id });
    if (!existingReaccion) {
      return res.status(404).json({ message: 'Reacción no encontrada' });
    }

    await Reaccion.findOneAndDelete({ IdReaccion: id });
    res.status(200).json({ message: 'Reacción eliminada exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};
