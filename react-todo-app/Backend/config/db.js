const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Cargar variables de entorno

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // 30 segundos
      socketTimeoutMS: 60000, // 60 segundos
      retryWrites: true,
      w: 'majority'
    });
    console.log('MongoDB Atlas connected');
  } catch (err) {
    console.error('MongoDB Atlas connection error:', err);
    console.log('Attempting to connect to local MongoDB...');
    try {
      await mongoose.connect(process.env.LOCAL_MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // 30 segundos
        socketTimeoutMS: 60000, // 60 segundos
        retryWrites: true,
        w: 'majority'
      });
      console.log('Local MongoDB connected');
    } catch (err) {
      console.error('Local MongoDB connection error:', err);
      process.exit(1); // Salir del proceso con error
    }
  }
};

module.exports = connectDB;
