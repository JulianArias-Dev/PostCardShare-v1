const express = require('express');
const router = express.Router();
const lugaresController = require('../controllers/controlLugar');

// Ruta para crear un nuevo lugar
router.post('/lugares', lugaresController.createLugar);

// Ruta para obtener todos los lugares
router.get('/lugares', lugaresController.getLugares);

// Ruta para actualizar un lugar existente
router.put('/lugares/:id', lugaresController.updateLugar);

// Ruta para eliminar un lugar existente
router.delete('/lugares/:id', lugaresController.deleteLugar);

module.exports = router;
