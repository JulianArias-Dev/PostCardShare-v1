const TipoReacciones = require('../models/modelTiporeaccion');

// Crear un nuevo tipo de reacción
exports.createTipoReaccion = async (req, res) => {
  try {
    const { IdTipo, Nombre } = req.body;
    
    // Verificar si ya existe un tipo de reacción con el mismo IdTipo
    const existingTipo = await TipoReacciones.findOne({ IdTipo });
    if (existingTipo) {
      return res.status(400).json({ message: 'Ya existe un tipo de reacción con este IdTipo' });
    }

    // Crear el nuevo tipo de reacción
    const nuevoTipoReaccion = new TipoReacciones({ IdTipo, Nombre });
    await nuevoTipoReaccion.save();
    res.status(201).json({ message: 'Tipo de reacción creado exitosamente', tipoReaccion: nuevoTipoReaccion });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el tipo de reacción', error: error.message });
  }
};

// Obtener todos los tipos de reacciones
exports.getTiposReacciones = async (req, res) => {
  try {
    const tiposReacciones = await TipoReacciones.find();
    res.status(200).json(tiposReacciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los tipos de reacciones', error: error.message });
  }
};

// Actualizar un tipo de reacción existente
exports.updateTipoReaccion = async (req, res) => {
  try {
    const { IdTipo } = req.params;
    const { Nombre } = req.body;
    
    // Verificar si ya existe un tipo de reacción con el mismo IdTipo
    const existingTipo = await TipoReacciones.findOne({ IdTipo });
    if (!existingTipo) {
      return res.status(404).json({ message: 'Tipo de reacción no encontrado' });
    }

    // Actualizar el tipo de reacción
    const updatedTipoReaccion = await TipoReacciones.findOneAndUpdate({ IdTipo }, { Nombre }, { new: true });
    res.status(200).json({ message: 'Tipo de reacción actualizado exitosamente', tipoReaccion: updatedTipoReaccion });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el tipo de reacción', error: error.message });
  }
};

// Eliminar un tipo de reacción existente
exports.deleteTipoReaccion = async (req, res) => {
  try {
    const { IdTipo } = req.params;
    
    // Verificar si ya existe un tipo de reacción con el mismo IdTipo
    const existingTipo = await TipoReacciones.findOne({ IdTipo });
    if (!existingTipo) {
      return res.status(404).json({ message: 'Tipo de reacción no encontrado' });
    }

    // Eliminar el tipo de reacción
    await TipoReacciones.findOneAndDelete({ IdTipo });
    res.status(200).json({ message: 'Tipo de reacción eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el tipo de reacción', error: error.message });
  }
};
