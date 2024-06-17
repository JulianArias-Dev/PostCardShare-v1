const express = require('express');
const router = express.Router();
const estadoController = require('../controllers/controlEstado');

// Rutas para los estados
router.post('/estados', estadoController.createEstado); // Crear un nuevo estado
router.get('/estados', estadoController.getEstados); // Obtener todos los estados
router.put('/estados/:id', estadoController.updateEstado); // Actualizar un estado existente
router.delete('/estados/:id', estadoController.deleteEstado); // Eliminar un estado existente
router.post('/estados/multiple', estadoController.createMultipleEstados); // Crear múltiples estados

module.exports = router;
