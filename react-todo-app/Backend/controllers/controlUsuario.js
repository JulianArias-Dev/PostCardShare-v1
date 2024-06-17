const User = require('../models/modelUsuario.js');
const bcrypt = require('bcryptjs');

// Crear Usuario
exports.createUser = async (req, res) => {
  const { NombreUsuario, Contrasenia, Nombres, Apellidos, Telefono, CorreoElectronico, FechaNacimiento, Descripcion, CiudadOrigen, FotoPerfil, UltimaConexion } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(Contrasenia, salt);

    const newUser = new User({
      NombreUsuario, // Asegúrate de incluir NombreUsuario en el objeto newUser
      Contrasenia: passwordHash,
      Nombres,
      Apellidos,
      Telefono,
      CorreoElectronico,
      FechaNacimiento,
      Descripcion,
      CiudadOrigen,
      FotoPerfil,
      UltimaConexion,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

// Actualizar Usuario
exports.updateUser = async (req, res) => {
  const { IdUsuario } = req.params;
  const { Contrasenia, Nombres, Apellidos, Telefono, CorreoElectronico, FechaNacimiento, Descripcion, CiudadOrigen, FotoPerfil, UltimaConexion, TipoUsuario, estado } = req.body;

  try {
    let updateUser = { Nombres, Apellidos, Telefono, CorreoElectronico, FechaNacimiento, Descripcion, CiudadOrigen, FotoPerfil, UltimaConexion, TipoUsuario, estado };

    if (Contrasenia) {
      const salt = await bcrypt.genSalt(10);
      updateUser.Contrasenia = await bcrypt.hash(Contrasenia, salt);
    }

    const user = await User.findOneAndUpdate({ IdUsuario }, updateUser, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

// Eliminar Usuario
exports.deleteUser = async (req, res) => {
  const { IdUsuario } = req.params;

  try {
    const user = await User.findOneAndDelete({ IdUsuario });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

// Iniciar Sesión
exports.loginUser = async (req, res) => {
  const { NombreUsuario, Contrasenia } = req.body;
  try {
    const user = await User.findOne({ NombreUsuario });
    if (!user) {
      return res.status(400).json({ message: 'Nombre de usuario o contraseña incorrectos' });
    }
    const isPasswordValid = await bcrypt.compare(Contrasenia, user.Contrasenia);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Nombre de usuario o contraseña incorrectos' });
    }
    // Incluye IdUsuario en la respuesta
    res.status(200).json({
      IdUsuario: user.IdUsuario,
      NombreUsuario: user.NombreUsuario,
      Nombres: user.Nombres,
      Apellidos: user.Apellidos,
      Telefono: user.Telefono,
      CorreoElectronico: user.CorreoElectronico,
      FechaNacimiento: user.FechaNacimiento,
      Descripcion: user.Descripcion,
      CiudadOrigen: user.CiudadOrigen,
      FotoPerfil: user.FotoPerfil,
      UltimaConexion: user.UltimaConexion,
      TipoUsuario: user.TipoUsuario,
      estado: user.estado
    });
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).send('Error en el servidor');
  }
};

// Cerrar Sesión
exports.logoutUser = (req, res) => {
  console.log("Aca llegue")
  req.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error en el servidor');
    }
    res.clearCookie(); // Ajusta el nombre de la cookie según sea necesario
    res.status(200).send('Sesión cerrada correctamente');
  });
};

// Obtener ID de usuario
exports.getUserId = async (req, res) => {
  const { NombreUsuario } = req.body;
  try {
    // Buscar al usuario por NombreUsuario
    const user = await User.findOne({ NombreUsuario });
    // Verificar si el usuario existe
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    // Si el usuario existe, devolver su ID
    res.status(200).json({ userId: user._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

exports.getUserById = async (req, res) => {
  const { IdUsuario } = req.params;
  try {
    // Convertir IdUsuario a un ObjectId
    const userId = mongoose.Types.ObjectId(IdUsuario);
    
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};