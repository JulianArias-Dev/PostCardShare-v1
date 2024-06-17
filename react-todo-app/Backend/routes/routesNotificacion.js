const express = require('express');
const router = express.Router();
const notificacionController = require('../controllers/notificacionController');

// Rutas para las notificaciones
router.post('/notificaciones', notificacionController.createNotificacion); // Crear una nueva notificación
router.get('/notificaciones', notificacionController.getNotificaciones); // Obtener todas las notificaciones
router.get('/notificaciones/:id', notificacionController.getNotificacionById); // Obtener una notificación por su IdNotificacion
router.put('/notificaciones/:id', notificacionController.updateNotificacion); // Actualizar una notificación existente
router.delete('/notificaciones/:id', notificacionController.deleteNotificacion); // Eliminar una notificación existente

module.exports = router;
