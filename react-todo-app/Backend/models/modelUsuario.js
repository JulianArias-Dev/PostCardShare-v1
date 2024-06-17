const mongoose = require('mongoose');

const UsuariosSchema = new mongoose.Schema({
    IdUsuario: { type: Number, unique: true },
    NombreUsuario: { type: String, required: true, unique: true }, // Nuevo campo para el nombre de usuario
    Contrasenia: { type: String, required: true },
    Nombres: { type: String, required: true },
    Telefono: { type: String, required: true },
    CorreoElectronico: { type: String, required: true },
    FechaNacimiento: { type: Date, required: false },
    Descripcion: { type: String, required: false },
    CiudadOrigen: { type: Number, required: true, ref: 'Ciudades' },
    FotoPerfil: { type: Buffer, required: false },
    UltimaConexion: { type: Date, required: false },
    TipoUsuario: { type: Number, default: 2, ref: 'Roles' }, // Por defecto: 2 (Usuario normal)
    estado: { type: String, default: 'Activo', ref: 'Estados' } // Por defecto: 'Activo'
});

// Middleware para generar IdUsuario incremental
UsuariosSchema.pre('save', async function (next) {
    if (!this.isNew) {
        return next();
    }
    try {
        const lastUsuario = await this.constructor.findOne({}, {}, { sort: { 'IdUsuario': -1 } });
        let nextId = 1;
        if (lastUsuario) {
            nextId = lastUsuario.IdUsuario + 1;
        }
        this.IdUsuario = nextId;
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Usuarios', UsuariosSchema);
