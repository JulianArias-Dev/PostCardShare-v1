const express = require('express');
const router = express.Router();
const rolesController = require('../controllers/controlRol');

// Ruta para crear un nuevo rol
router.post('/roles', rolesController.createRole);

// Ruta para obtener todos los roles
router.get('/roles', rolesController.getRoles);

// Ruta para actualizar un rol existente
router.put('/roles/:id', rolesController.updateRole);

// Ruta para eliminar un rol existente
router.delete('/roles/:id', rolesController.deleteRole);

module.exports = router;
