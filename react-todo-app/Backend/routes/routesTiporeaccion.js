const express = require('express');
const router = express.Router();
const tipoReaccionController = require('../controllers/controlTiporeaccion');

// Crear un nuevo tipo de reacción
router.post('/tipo-reaccion', tipoReaccionController.createTipoReaccion);

// Obtener todos los tipos de reacciones
router.get('/tipo-reaccion', tipoReaccionController.getTiposReacciones);

// Actualizar un tipo de reacción existente
router.put('/tipo-reaccion/:IdTipo', tipoReaccionController.updateTipoReaccion);

// Eliminar un tipo de reacción existente
router.delete('/tipo-reaccion/:IdTipo', tipoReaccionController.deleteTipoReaccion);

module.exports = router;
