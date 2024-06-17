const express = require('express');
const router = express.Router();
const reaccionController = require('../controllers/controlReaccion');

// Rutas para las reacciones
router.post('/reacciones', reaccionController.createReaccion); // Crear una nueva reacción
router.get('/reacciones', reaccionController.getReacciones); // Obtener todas las reacciones
router.get('/reacciones/:id', reaccionController.getReaccionById); // Obtener una reacción por su IdReaccion
router.put('/reacciones/:id', reaccionController.updateReaccion); // Actualizar una reacción existente
router.delete('/reacciones/:id', reaccionController.deleteReaccion); // Eliminar una reacción existente
router.post('/publicaciones/:publicacionId/likes/:usuarioId', reaccionController.registrarLike);


module.exports = router;
