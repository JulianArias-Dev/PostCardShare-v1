const express = require('express');
const router = express.Router();
const etiquetaController = require('../controllers/controlEtiqueta');

// Rutas para las etiquetas
router.post('/etiquetas', etiquetaController.createEtiqueta); // Crear una nueva etiqueta
router.get('/etiquetas', etiquetaController.getEtiquetas); // Obtener todas las etiquetas
router.get('/etiquetas/:id', etiquetaController.getEtiquetaById); // Obtener una etiqueta por su IdEtiqueta
router.put('/etiquetas/:id', etiquetaController.updateEtiqueta); // Actualizar una etiqueta existente
router.delete('/etiquetas/:id', etiquetaController.deleteEtiqueta); // Eliminar una etiqueta existente

module.exports = router;
