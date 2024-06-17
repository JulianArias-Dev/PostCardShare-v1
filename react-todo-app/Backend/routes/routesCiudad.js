const express = require('express');
const router = express.Router();
const ciudadController = require('../controllers/controlCiudad');

// Ruta para crear una nueva ciudad
router.post('/ciudades', ciudadController.createCiudad);

// Ruta para obtener todas las ciudades
router.get('/ciudades', ciudadController.getCiudades);

// Ruta para actualizar una ciudad existente por su IdCiudad
router.put('/ciudades/:IdCiudad', ciudadController.updateCiudad);

// Ruta para eliminar una ciudad existente por su IdCiudad
router.delete('/ciudades/:IdCiudad', ciudadController.deleteCiudad);

// Ruta para crear múltiples ciudades
router.post('/ciudades/multiples', ciudadController.createMultipleCiudades);

module.exports = router;
