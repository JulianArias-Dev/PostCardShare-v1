const Notificacion = require('../models/modelNotificacion');

// Crear una nueva notificación
exports.createNotificacion = async (req, res) => {
  const { IdNotificacion, Destino, Descripcion, Origen } = req.body;

  try {
    const existingNotificacion = await Notificacion.findOne({ IdNotificacion });
    if (existingNotificacion) {
      return res.status(400).json({ message: 'Ya existe una notificación con este IdNotificacion' });
    }

    const newNotificacion = new Notificacion({ IdNotificacion, Destino, Descripcion, Origen });
    await newNotificacion.save();
    res.status(201).json(newNotificacion);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Obtener todas las notificaciones
exports.getNotificaciones = async (req, res) => {
  try {
    const notificaciones = await Notificacion.find();
    res.status(200).json(notificaciones);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Obtener una notificación por su IdNotificacion
exports.getNotificacionById = async (req, res) => {
  const { id } = req.params;

  try {
    const notificacion = await Notificacion.findOne({ IdNotificacion: id });
    if (!notificacion) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }
    res.status(200).json(notificacion);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Actualizar una notificación existente
exports.updateNotificacion = async (req, res) => {
  const { id } = req.params;
  const { Destino, Descripcion, Origen } = req.body;

  try {
    const existingNotificacion = await Notificacion.findOne({ IdNotificacion: id });
    if (!existingNotificacion) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }

    const updatedNotificacion = await Notificacion.findOneAndUpdate({ IdNotificacion: id }, { Destino, Descripcion, Origen }, { new: true });
    res.status(200).json(updatedNotificacion);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Eliminar una notificación existente
exports.deleteNotificacion = async (req, res) => {
  const { id } = req.params;

  try {
    const existingNotificacion = await Notificacion.findOne({ IdNotificacion: id });
    if (!existingNotificacion) {
      return res.status(404).json({ message: 'Notificación no encontrada' });
    }

    await Notificacion.findOneAndDelete({ IdNotificacion: id });
    res.status(200).json({ message: 'Notificación eliminada exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};
