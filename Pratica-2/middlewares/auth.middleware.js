import jwt from 'jsonwebtoken';

// Configuración de las cookies
const cookieOptions = {
  httpOnly: true,  // Evita el acceso a las cookies desde JavaScript (seguridad)
  secure: process.env.NODE_ENV === 'production',  // Solo en HTTPS en producción
  sameSite: 'strict',  // Protege de ataques CSRF
  maxAge: 24 * 60 * 60 * 1000 // Expira en 1 día
};

// Controlador para el inicio de sesión
export const signIn = async (req, res) => {
  const { email, password } = req.body;

  // Verificación del usuario y contraseña (simplificado)
  const user = await User.findOne({ where: { email } });

  if (!user || !(await user.validPassword(password))) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  // Crear un JWT para el usuario autenticado
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  // Enviar el token en una cookie segura
  res.cookie('access_token', accessToken, cookieOptions);

  // Enviar la respuesta con el usuario (sin el token)
  res.json({ user: { id: user.id, email: user.email, role: user.role } });
};

// Controlador para el cierre de sesión
export const signOut = (req, res) => {
  res.clearCookie('access_token');
  res.json({ message: 'Sesión cerrada correctamente' });
};



// Middleware para verificar el token desde las cookies
export const verifyToken = (req, res, next) => {
  const token = req.cookies['access_token']; // Obtenemos el token de las cookies

  if (!token) {
    return res.status(403).json({ message: 'Acceso denegado, se requiere autenticación.' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido.' });
    }
    req.user = user; // Guardar la información del usuario en req.user
    next(); // Continuar al siguiente middleware o ruta
  });
};
