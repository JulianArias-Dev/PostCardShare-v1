const Ciudades = require('../models/modelCiudad');

// Crear una nueva ciudad
exports.createCiudad = async (req, res) => {
  try {
    const { IdCiudad, Nombre } = req.body;
    
    // Verificar si ya existe una ciudad con el mismo IdCiudad
    const existingCiudad = await Ciudades.findOne({ IdCiudad });
    if (existingCiudad) {
      return res.status(400).json({ message: 'Ya existe una ciudad con este IdCiudad' });
    }

    // Si no existe, crear la nueva ciudad
    const nuevaCiudad = new Ciudades({ IdCiudad, Nombre });
    await nuevaCiudad.save();
    res.status(201).json({ message: 'Ciudad creada exitosamente', ciudad: nuevaCiudad });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la ciudad', error: error.message });
  }
};

// Obtener todas las ciudades
exports.getCiudades = async (req, res) => {
  try {
    const ciudades = await Ciudades.find();
    res.status(200).json(ciudades);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las ciudades', error: error.message });
  }
};

// Actualizar una ciudad existente
exports.updateCiudad = async (req, res) => {
  try {
    const { IdCiudad } = req.params;
    const { Nombre } = req.body;
    
    // Verificar si la ciudad existe antes de actualizar
    const existingCiudad = await Ciudades.findOne({ IdCiudad });
    if (!existingCiudad) {
      return res.status(404).json({ message: 'Ciudad no encontrada' });
    }

    // Actualizar la ciudad
    existingCiudad.Nombre = Nombre;
    const updatedCiudad = await existingCiudad.save();
    res.status(200).json({ message: 'Ciudad actualizada exitosamente', ciudad: updatedCiudad });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la ciudad', error: error.message });
  }
};

// Eliminar una ciudad existente
exports.deleteCiudad = async (req, res) => {
  try {
    const { IdCiudad } = req.params;
    
    // Eliminar la ciudad por su IdCiudad
    const deletedCiudad = await Ciudades.findOneAndDelete({ IdCiudad });
    if (!deletedCiudad) {
      return res.status(404).json({ message: 'Ciudad no encontrada' });
    }
    res.status(200).json({ message: 'Ciudad eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la ciudad', error: error.message });
  }
};

exports.createMultipleCiudades = async (req, res) => {
  try {
    const ciudades = req.body; // Espera que el cuerpo de la solicitud sea una lista de ciudades
    
    const ciudadesCreadas = [];
    
    for (const ciudadData of ciudades) {
      const nuevaCiudad = new Ciudades(ciudadData);
      await nuevaCiudad.save();
      ciudadesCreadas.push(nuevaCiudad);
    }

    res.status(201).json({ message: 'Ciudades creadas exitosamente', ciudades: ciudadesCreadas });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear las ciudades', error: error.message });
  }
};
