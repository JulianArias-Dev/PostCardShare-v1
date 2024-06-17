const Roles = require('../models/modelRol');

// Crear un nuevo rol
exports.createRole = async (req, res) => {
  try {
    const { IdRol, NombreRol } = req.body;
    
    // Verificar si ya existe un rol con el mismo IdRol
    const existingRole = await Roles.findOne({ IdRol });
    if (existingRole) {
      return res.status(400).json({ message: 'Ya existe un rol con este IdRol' });
    }

    const role = new Roles({ IdRol, NombreRol });
    await role.save();
    res.status(201).json({ message: 'Rol creado exitosamente', role });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el rol', error: error.message });
  }
};

// Obtener todos los roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await Roles.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los roles', error: error.message });
  }
};

// Actualizar un rol existente
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { NombreRol } = req.body;
    
    // Verificar si ya existe un rol con el mismo IdRol
    const existingRole = await Roles.findOne({ IdRol: id });
    if (!existingRole) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    const updatedRole = await Roles.findOneAndUpdate({ IdRol: id }, { NombreRol }, { new: true });
    res.status(200).json({ message: 'Rol actualizado exitosamente', role: updatedRole });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el rol', error: error.message });
  }
};

// Eliminar un rol existente
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar si ya existe un rol con el mismo IdRol
    const existingRole = await Roles.findOne({ IdRol: id });
    if (!existingRole) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    await Roles.findOneAndDelete({ IdRol: id });
    res.status(200).json({ message: 'Rol eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el rol', error: error.message });
  }
};
