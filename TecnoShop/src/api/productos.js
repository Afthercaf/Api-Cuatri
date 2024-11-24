import axios from "./axios.js";

// Rutas para piezas/repuestos
export const getPiezasRepuestosRequest = async () => {
  try {
    const res = await axios.get('/piezas-repuestos');
    return res.data;
  } catch (error) {
    console.error('Error obteniendo piezas/repuestos:', error);
    return null;
  }
};

export const getPiezaRepuestoRequest = async (id) =>
  axios.get(`/piezas-repuestos/${id}`);

export const createPiezaRepuestoRequest = async (data) =>
  axios.post('/piezas-repuestos', data);

export const updatePiezaRepuestoRequest = async (id, data) =>
  axios.put(`/piezas-repuestos/${id}`, data);

export const deletePiezaRepuestoRequest = async (id) =>
  axios.delete(`/piezas-repuestos/${id}`);

// Rutas para órdenes de servicio
export const getOrdenesServicioRequest = async () =>
  axios.get('/ordenes-servicio');

export const getOrdenServicioRequest = async (id) =>
  axios.get(`/ordenes-servicio/${id}`);

export const createOrdenServicioRequest = async (data) =>
  axios.post('/ordenes-servicio', data);

export const updateOrdenServicioRequest = async (id, data) =>
  axios.put(`/ordenes-servicio/${id}`, data);

export const deleteOrdenServicioRequest = async (id) =>
  axios.delete(`/ordenes-servicio/${id}`);

// Rutas para usuarios
export const getUsuariosRequest = async () =>
  axios.get('/usuarios');

export const getUsuarioRequest = async (id) =>
  axios.get(`/usuarios/${id}`);

export const createUsuarioRequest = async (data) =>
  axios.post('/usuarios', data);

export const updateUsuarioRequest = async (id, data) =>
  axios.put(`/usuarios/${id}`, data);

export const deleteUsuarioRequest = async (id) =>
  axios.delete(`/usuarios/${id}`);

// Rutas para compras
export const getComprasRequest = async () =>
  axios.get('/compras');

export const getCompraRequest = async (id) =>
  axios.get(`/compras/${id}`);

export const createCompraRequest = async (data) =>
  axios.post('/compras', data);

export const updateCompraRequest = async (id, data) =>
  axios.put(`/compras/${id}`, data);

export const deleteCompraRequest = async (id) =>
  axios.delete(`/compras/${id}`);

// Rutas para detalle de compra
export const getDetallesCompraRequest = async () =>
  axios.get('/detalle-compra');

export const getDetalleCompraRequest = async (id) =>
  axios.get(`/detalle-compra/${id}`);

export const createDetalleCompraRequest = async (data) =>
  axios.post('/detalle-compra', data);

export const updateDetalleCompraRequest = async (id, data) =>
  axios.put(`/detalle-compra/${id}`, data);

export const deleteDetalleCompraRequest = async (id) =>
  axios.delete(`/detalle-compra/${id}`);

// Rutas para inventario
export const getInventarioRequest = async () =>
  axios.get('/inventario');

export const getRegistroInventarioRequest = async (id) =>
  axios.get(`/inventario/${id}`);

export const createRegistroInventarioRequest = async (data) =>
  axios.post('/inventario', data);

export const updateRegistroInventarioRequest = async (id, data) =>
  axios.put(`/inventario/${id}`, data);

export const deleteRegistroInventarioRequest = async (id) =>
  axios.delete(`/inventario/${id}`);
