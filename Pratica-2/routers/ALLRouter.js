import { 
  allpiezas_repuestos, 
  onepiezas_repuestos, 
  Postpiezas_repuestos, 
  PUTpiezas_repuestos, 
  delitepiezas_repuestos, 
  Allordenes_servicio, 
  oneordenes_servicio, 
  POSTordenes_servicio, 
  PUTordenes_servicio, 
  DELETEordenes_servicio, 
  allUsuario, 
  oneUsuario, 
  POSTUsuario, 
  PUTUsuario, 
  DELETEUsuario, 
  allcompras, 
  oneecompras, 
  postcompras, 
  PUTcompras, 
  DELETEcompras, 
  Alldetalle_compra, 
  onedetalle_compra, 
  postdetalle_compra, 
  PUTdetalle_compra, 
  deletedetalle_compra, 
  ALLinventario, 
  ONEinventario, 
  POSTinventario, 
  PUTinventario, 
  deleteinventario 
} from '../controllers/Piezas_Repuestos.js';
import { Router } from "express";
import multer from "multer";

const router = Router(); 

// Configuración de Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rutas sin verificación de token
router.get('/piezas-repuestos', allpiezas_repuestos);
router.get('/piezas-repuestos/:id', onepiezas_repuestos);
router.post('/piezas-repuestos', upload.single('image'), Postpiezas_repuestos);
router.put('/piezas-repuestos/:id', PUTpiezas_repuestos);
router.delete('/piezas-repuestos/:id', delitepiezas_repuestos);

router.get('/ordenes-servicio', Allordenes_servicio);
router.get('/ordenes-servicio/:id', oneordenes_servicio);
router.post('/ordenes-servicio', POSTordenes_servicio);
router.put('/ordenes-servicio/:id', PUTordenes_servicio);
router.delete('/ordenes-servicio/:id', DELETEordenes_servicio);

router.get('/usuarios', allUsuario);
router.get('/usuarios/:id', oneUsuario);
router.post('/usuarios', POSTUsuario); // Suponiendo que el registro no requiere autenticación
router.put('/usuarios/:id', PUTUsuario);
router.delete('/usuarios/:id', DELETEUsuario);

router.get('/compras', allcompras);
router.get('/compras/:id', oneecompras);
router.post('/compras', postcompras);
router.put('/compras/:id', PUTcompras);
router.delete('/compras/:id', DELETEcompras);

router.get('/detalle-compra', Alldetalle_compra);
router.get('/detalle-compra/:id', onedetalle_compra);
router.post('/detalle-compra', postdetalle_compra);
router.put('/detalle-compra/:id', PUTdetalle_compra);
router.delete('/detalle-compra/:id', deletedetalle_compra);

router.get('/inventario', ALLinventario);
router.get('/inventario/:id', ONEinventario);
router.post('/inventario', POSTinventario);
router.put('/inventario/:id', PUTinventario);
router.delete('/inventario/:id', deleteinventario);

export default router;
