import express from 'express';
import router from './routers/union.js'; // Asegúrate de que esta ruta es correcta
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Cambia esto a la URL de tu frontend en Vercel en producción
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Permite que las cookies se envíen
  })
);

app.use(express.json()); // Middleware para parsear JSON
app.use(cookieParser()); // Middleware para manejar cookies

// Rutas de la API
app.use(router); // Asegúrate de que las rutas estén correctamente configuradas en 'routers/union.js'

// Inicia el servidor en el puerto 4000
app.listen(4000, () => {
  console.log('Server running on port 4000');
});
