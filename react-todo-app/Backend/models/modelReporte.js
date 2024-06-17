const mongoose = require('mongoose');

const ReporteSchema = new mongoose.Schema({
    IdReporte: { type: Number, required: false, unique: true },
    Tipo: { type: String, required: true }, // Tipo de reporte (por ejemplo: publicación, comentario, usuario)
    ElementoId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Id del elemento reportado
    Descripcion: { type: String, required: true }, // Descripción del reporte
    Fecha: { type: Date, default: Date.now }, // Fecha de creación del reporte
    Estado: { type: String, enum: ['Pendiente', 'Resuelto'], default: 'Pendiente' } // Estado del reporte (pendiente o resuelto)
});

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

module.exports = mongoose.model('Reportes', ReporteSchema);

