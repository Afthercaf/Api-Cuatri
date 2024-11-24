import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Configuración de la conexión a la base de datos
export const db = mysql.createPool({
    host: 'localhost',      // Cambia si tu host es diferente
    user: 'root',           // Usuario de MySQL
    password: '450927',     // Contraseña de MySQL
    database: 'mecanico',   // Cambia con tu nombre de base de datos
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Conectar a la base de datos (no es necesario con pool)
console.log('Pool de conexiones a la base de datos MySQL creado con éxito');

export const TOKEN_SECRET = process.env.TOKEN_SECRET;
