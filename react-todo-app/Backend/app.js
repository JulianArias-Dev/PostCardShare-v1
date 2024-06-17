const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors'); // Importa el módulo CORS

//Rutas Importacion
const userRoutes = require('./routes/routesUsuario');
const rolRoutes = require('./routes/routesRol');
const ciudadRoutes = require('./routes/routesCiudad');
const tiporeacRoutes = require('./routes/routesTiporeaccion');
const lugarRoutes = require('./routes/routesLugar');
const comentarioRoutes = require ('./routes/routesComentario');
const reporteRoutes = require('./routes/routesReporte');
const estadoRoutes = require('./routes/routesEstado');
const reaccionRoutes = require('./routes/routesReaccion');
const etiquetaRoutes = require('./routes/routesEtiqueta');
const publicacionRoutes = require('./routes/routesPublicacion');

dotenv.config();
const app = express();
// Connect Database
connectDB();

// Middleware CORS
app.use(cors());

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api', userRoutes);
app.use('/api', rolRoutes );
app.use('/api', ciudadRoutes);
app.use('/api', tiporeacRoutes);
app.use('/api', lugarRoutes);
app.use('/api', comentarioRoutes);
app.use('/api', reporteRoutes);
app.use('/api', estadoRoutes);
app.use('/api', reaccionRoutes);
app.use('/api', etiquetaRoutes);
app.use('/api', publicacionRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req,res) => {
    res.send({Data:"Has llegado"})
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
