const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/controlComentario');

// Ruta para crear un nuevo comentario
router.post('/comentarios', comentarioController.createComentario);

// Ruta para obtener todos los comentarios
router.get('/comentarios', comentarioController.getComentarios);

// Ruta para actualizar un comentario existente
router.put('/comentarios/:IdComentario', comentarioController.updateComentario);

// Ruta para eliminar un comentario existente
router.delete('/comentarios/:IdComentario', comentarioController.deleteComentario);

module.exports = router;
