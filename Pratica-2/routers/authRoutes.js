import { Router } from 'express';
import { signUp, signIn, verifyToken, logout } from '../controllers/Auth.js'; // Ajusta la ruta a tu controlador
import { validator } from "../middlewares/validator.middleware.js"; 
import { signupSchema, signinSchema } from "../schemas/auth.schema.js"; 

const router = Router();

router.post('/signup', validator(signupSchema), signUp);

// Ruta para el inicio de sesión
router.post('/signin', validator(signinSchema), signIn);

router.get("/verify", verifyToken);

router.post("/logout",logout);


export default router;