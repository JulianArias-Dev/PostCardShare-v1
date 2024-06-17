const Lugares = require('../models/modelLugar');
const Ciudades = require('../models/modelCiudad');

exports.createLugar = async (req, res) => {
  try {
    const { IdLugar, IdCiudad, Nombre, Actividad, Calificacion } = req.body;

    // Verificar si la ciudad proporcionada existe
    const existingCiudad = await Ciudades.findOne({ IdCiudad });
    if (!existingCiudad) {
      return res.status(400).json({ message: 'La ciudad proporcionada no existe' });
    }

    // Crear un nuevo lugar con el IdCiudad proporcionado
    const lugar = new Lugares({ IdLugar, Ciudad: IdCiudad, Nombre, Actividad, Calificacion });
    await lugar.save();
    res.status(201).json({ message: 'Lugar creado exitosamente', lugar });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el lugar', error: error.message });
  }
};


// Controlador para actualizar un lugar existente
exports.updateLugar = async (req, res) => {
  try {
    const { id } = req.params;
    const { IdCiudad, Nombre, Actividad, Calificacion } = req.body;

    // Verificar si la ciudad proporcionada existe
    const existingCiudad = await Ciudades.findOne({ IdCiudad: parseInt(IdCiudad) }); // Convertir IdCiudad a entero
    if (!existingCiudad) {
      return res.status(400).json({ message: 'La ciudad proporcionada no existe' });
    }

    // Actualizar el lugar con los nuevos datos
    const updatedLugar = await Lugares.findOneAndUpdate({ IdLugar: id }, { IdCiudad, Nombre, Actividad, Calificacion }, { new: true });
    res.status(200).json({ message: 'Lugar actualizado exitosamente', lugar: updatedLugar });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el lugar', error: error.message });
  }
};


// Obtener todos los lugares
exports.getLugares = async (req, res) => {
  try {
    const lugares = await Lugares.find();
    res.status(200).json(lugares);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los lugares', error: error.message });
  }
};

// Eliminar un lugar existente
exports.deleteLugar = async (req, res) => {
  try {
    const { id } = req.params;
    await Lugares.findOneAndDelete({ IdLugar: id });
    res.status(200).json({ message: 'Lugar eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el lugar', error: error.message });
  }
};
