const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/controlReporte');

// Rutas para los reportes
router.post('/reportes', reporteController.createReporte); // Crear un nuevo reporte
router.get('/reportes', reporteController.getReportes); // Obtener todos los reportes
router.get('/reportes/:id', reporteController.getReporteById); // Obtener un reporte por su IdReporte
router.put('/reportes/:id', reporteController.updateReporte); // Actualizar un reporte existente
router.delete('/reportes/:id', reporteController.deleteReporte); // Eliminar un reporte existente

module.exports = router;
