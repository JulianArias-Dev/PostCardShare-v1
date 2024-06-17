const Etiqueta = require('../models/modelEtiqueta');

// Crear una nueva etiqueta
exports.createEtiqueta = async (req, res) => {
  const { IdEtiqueta, Descripcion, Nombre, Actividad } = req.body;

  try {
    const existingEtiqueta = await Etiqueta.findOne({ IdEtiqueta });
    if (existingEtiqueta) {
      return res.status(400).json({ message: 'Ya existe una etiqueta con este IdEtiqueta' });
    }

    const newEtiqueta = new Etiqueta({ IdEtiqueta, Descripcion, Nombre, Actividad });
    await newEtiqueta.save();
    res.status(201).json(newEtiqueta);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Obtener todas las etiquetas
exports.getEtiquetas = async (req, res) => {
  try {
    const etiquetas = await Etiqueta.find();
    res.status(200).json(etiquetas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Obtener una etiqueta por su IdEtiqueta
exports.getEtiquetaById = async (req, res) => {
  const { id } = req.params;

  try {
    const etiqueta = await Etiqueta.findOne({ IdEtiqueta: id });
    if (!etiqueta) {
      return res.status(404).json({ message: 'Etiqueta no encontrada' });
    }
    res.status(200).json(etiqueta);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Actualizar una etiqueta existente
exports.updateEtiqueta = async (req, res) => {
  const { id } = req.params;
  const { Descripcion, Nombre, Actividad } = req.body;

  try {
    const existingEtiqueta = await Etiqueta.findOne({ IdEtiqueta: id });
    if (!existingEtiqueta) {
      return res.status(404).json({ message: 'Etiqueta no encontrada' });
    }

    const updatedEtiqueta = await Etiqueta.findOneAndUpdate({ IdEtiqueta: id }, { Descripcion, Nombre, Actividad }, { new: true });
    res.status(200).json(updatedEtiqueta);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Eliminar una etiqueta existente
exports.deleteEtiqueta = async (req, res) => {
  const { id } = req.params;

  try {
    const existingEtiqueta = await Etiqueta.findOne({ IdEtiqueta: id });
    if (!existingEtiqueta) {
      return res.status(404).json({ message: 'Etiqueta no encontrada' });
    }

    await Etiqueta.findOneAndDelete({ IdEtiqueta: id });
    res.status(200).json({ message: 'Etiqueta eliminada exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};
