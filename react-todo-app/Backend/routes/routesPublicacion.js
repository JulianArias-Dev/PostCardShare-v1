const express = require('express');
const router = express.Router();
const publicacionController = require('../controllers/controlPublicacion');

// Rutas para las publicaciones
router.post('/publicaciones', publicacionController.createPublicacion); // Crear una nueva publicación
router.get('/publicaciones', publicacionController.getPublicaciones); // Obtener todas las publicaciones
router.get('/publicaciones/:id', publicacionController.getPublicacionById); // Obtener una publicación por su IdPublicacion
router.put('/publicaciones/:id', publicacionController.updatePublicacion); // Actualizar una publicación existente
router.delete('/publicaciones/:id', publicacionController.deletePublicacion); // Eliminar una publicación existente
// Ruta para obtener la cantidad de likes de una publicación
router.get('/publicaciones/:idPublicacion/likes', publicacionController.obtenerLikes);
router.get('/publicaciones/usuario/:idUsuario', publicacionController.getPublicacionesByUsuarioId);



module.exports = router;
