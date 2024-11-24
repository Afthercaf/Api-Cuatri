import { db } from '../DBS/database.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../lib/helpers.js";

const pool = db;

// Registrar Usuario
export const signUp = async (req, res) => {
  const { nombre, email, telefono, direccion, password } = req.body;

  try {
    // Verificar si el correo ya está registrado
    const [userFound] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (userFound.length > 0) {
      return res.status(400).json({ message: "El correo electrónico ya está en uso" });
    }

    // Encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    const [result] = await pool.query(
      "INSERT INTO usuarios (nombre, email, contraseña, telefono, direccion, rol, fecha_registro, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nombre, email, passwordHash, telefono, direccion, "user", new Date(), "activo"]
    );

    const user = {
      id_usuario: result.insertId,
      nombre,
      email,
      rol: "user",
    };

    // Crear token
    const token = await createAccessToken({ id: user.id_usuario, role: user.rol });

    // Configurar cookie con el token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Iniciar Sesión
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar usuario por correo
    const [users] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(400).json({ message: "El correo electrónico no existe" });
    }

    const userFound = users[0];

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, userFound.contraseña);
    if (!isMatch) {
      return res.status(400).json({ message: "La contraseña es incorrecta" });
    }

    // Crear token
    const token = await createAccessToken({
      id: userFound.id_usuario,
      username: userFound.nombre,
      role: userFound.rol,
    });

    // Configurar cookie con el token
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.json({
      id_usuario: userFound.id_usuario,
      nombre: userFound.nombre,
      email: userFound.email,
      telefono: userFound.telefono,
      direccion: userFound.direccion,
      rol: userFound.rol,
    });
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Verificar Token
export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.send(false);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, decoded) => {
    if (error) {
      return res.sendStatus(401);
    }

    // Buscar usuario por ID
    const [users] = await pool.query("SELECT * FROM usuarios WHERE id_usuario = ?", [decoded.id]);
    if (users.length === 0) {
      return res.sendStatus(401);
    }

    const userFound = users[0];
    res.json({
      id_usuario: userFound.id_usuario,
      nombre: userFound.nombre,
      email: userFound.email,
      rol: userFound.rol,
      estado: userFound.estado,
    });
  });
};

// Cerrar Sesión
export const logout = (req, res) => {
  // Borra el token de autenticación
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });

  return res.sendStatus(200);
};
