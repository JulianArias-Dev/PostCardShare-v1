const Reporte = require('../models/modelReporte');

// Crear un nuevo reporte
exports.createReporte = async (req, res) => {
  const { Tipo, ElementoId, Descripcion } = req.body;

  try {
      // Lógica para generar un nuevo ID de reporte incremental
      const lastReporte = await Reporte.findOne({}, {}, { sort: { 'IdReporte': -1 } });
      let nextId = 1;
      if (lastReporte && lastReporte.IdReporte) {
          nextId = lastReporte.IdReporte + 1;
      }

      const newReporte = new Reporte({ IdReporte: nextId, Tipo, ElementoId, Descripcion });
      await newReporte.save();
      res.status(201).json(newReporte);
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Error en el servidor');
  }
};

// Obtener todos los reportes
exports.getReportes = async (req, res) => {
  try {
    const reportes = await Reporte.find();
    res.status(200).json(reportes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Obtener un reporte por su IdReporte
exports.getReporteById = async (req, res) => {
  const { id } = req.params;

  try {
    const reporte = await Reporte.findOne({ IdReporte: id });
    if (!reporte) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }
    res.status(200).json(reporte);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Actualizar un reporte existente
exports.updateReporte = async (req, res) => {
  const { id } = req.params;
  const { Tipo, ElementoId, Descripcion, Estado } = req.body;

  try {
    const existingReporte = await Reporte.findOne({ IdReporte: id });
    if (!existingReporte) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }

    const updatedReporte = await Reporte.findOneAndUpdate({ IdReporte: id }, { Tipo, ElementoId, Descripcion, Estado }, { new: true });
    res.status(200).json(updatedReporte);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};

// Eliminar un reporte existente
exports.deleteReporte = async (req, res) => {
  const { id } = req.params;

  try {
    const existingReporte = await Reporte.findOne({ IdReporte: id });
    if (!existingReporte) {
      return res.status(404).json({ message: 'Reporte no encontrado' });
    }

    await Reporte.findOneAndDelete({ IdReporte: id });
    res.status(200).json({ message: 'Reporte eliminado exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error en el servidor');
  }
};
