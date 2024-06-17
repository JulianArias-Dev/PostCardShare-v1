const express = require('express');
const router = express.Router();
const userController = require('../controllers/controlUsuario');
const { loginUser, logoutUser, getUserId } = require('../controllers/controlUsuario');
const Usuario = require('../models/modelUsuario');


// Crear Usuario
router.post('/usuarios', userController.createUser);

// Actualizar Usuario
router.put('/usuarios/:IdUsuario', userController.updateUser);

// Eliminar Usuario
router.delete('/usuarios/:IdUsuario', userController.deleteUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

//Ruta para Salir Sesion
router.post('/logout', logoutUser);

// Ruta para obtener el ID de usuario
router.post('/get-user-id', getUserId);

router.get('/usuarios/:IdUsuario', userController.getUserById);



router.post('/check-username', async (req, res) => {
    const { NombreUsuario } = req.body;

    try {
        const user = await Usuario.findOne({ NombreUsuario });
        if (user) {
            return res.status(400).json({ error: 'Nombre de usuario ya existe' });
        }
        res.status(200).json({ message: 'Nombre de usuario disponible' });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;
