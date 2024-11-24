import { Router } from 'express';
import authRoutes from './authRoutes.js'; // Asegúrate de que el nombre y la ruta sean correctos
import piezasRoutes from './ALLRouter.js'; // Importa tus rutas de piezas y otros recursos

const router = Router();

// Usar las rutas de autenticación
router.use('/auth', authRoutes); // Las rutas de auth estarán bajo /auth

// Usar las rutas de piezas y otros recursos
router.use('/api', piezasRoutes); // Las rutas de piezas estarán bajo /piezas-repuestos

// Aquí puedes agregar más rutas en el futuro...

export default router;

