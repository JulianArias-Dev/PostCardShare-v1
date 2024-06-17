const Estado = require('../models/modelEstado');

// Crear un nuevo estado
exports.createEstado = async (req, res) => {
  try {
    const { Nombre, Descripcion } = req.body;
    
    // Crear el nuevo estado
    const nuevoEstado = new Estado({ Nombre, Descripcion });
    await nuevoEstado.save();
    res.status(201).json({ message: 'Estado creado exitosamente', estado: nuevoEstado });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el estado', error: error.message });
  }
};

// Obtener todos los estados
exports.getEstados = async (req, res) => {
  try {
    const estados = await Estado.find();
    res.status(200).json(estados);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los estados', error: error.message });
  }
};

// Actualizar un estado existente
exports.updateEstado = async (req, res) => {
  try {
    const { IdEstado } = req.params;
    const { Nombre, Descripcion } = req.body;
    
    // Verificar si el estado existe antes de actualizar
    const existingEstado = await Estado.findById(IdEstado);
    if (!existingEstado) {
      return res.status(404).json({ message: 'Estado no encontrado' });
    }

    // Actualizar el estado
    existingEstado.Nombre = Nombre;
    existingEstado.Descripcion = Descripcion;
    const updatedEstado = await existingEstado.save();
    res.status(200).json({ message: 'Estado actualizado exitosamente', estado: updatedEstado });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el estado', error: error.message });
  }
};

// Eliminar un estado existente
exports.deleteEstado = async (req, res) => {
  try {
    const { IdEstado } = req.params;
    
    // Eliminar el estado por su IdEstado
    const deletedEstado = await Estado.findByIdAndDelete(IdEstado);
    if (!deletedEstado) {
      return res.status(404).json({ message: 'Estado no encontrado' });
    }
    res.status(200).json({ message: 'Estado eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el estado', error: error.message });
  }
};

exports.createMultipleEstados = async (req, res) => {
  try {
    const estados = req.body; // Espera que el cuerpo de la solicitud sea una lista de estados
    
    const estadosCreados = [];
    
    for (const estadoData of estados) {
      const nuevoEstado = new Estado(estadoData);
      await nuevoEstado.save();
      estadosCreados.push(nuevoEstado);
    }

    res.status(201).json({ message: 'Estados creados exitosamente', estados: estadosCreados });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear los estados', error: error.message });
  }
};
