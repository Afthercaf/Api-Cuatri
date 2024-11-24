import { createContext, useContext, useState } from "react";
import {
  // Piezas/Repuestos
  getPiezasRepuestosRequest,
  getPiezaRepuestoRequest,
  createPiezaRepuestoRequest,
  updatePiezaRepuestoRequest,
  deletePiezaRepuestoRequest,
  // Órdenes de Servicio
  getOrdenesServicioRequest,
  getOrdenServicioRequest,
  createOrdenServicioRequest,
  updateOrdenServicioRequest,
  deleteOrdenServicioRequest,
  // Usuarios
  getUsuariosRequest,
  getUsuarioRequest,
  createUsuarioRequest,
  updateUsuarioRequest,
  deleteUsuarioRequest,
  // Compras
  getComprasRequest,
  getCompraRequest,
  createCompraRequest,
  updateCompraRequest,
  deleteCompraRequest,
  // Detalles de Compra
  getDetallesCompraRequest,
  getDetalleCompraRequest,
  createDetalleCompraRequest,
  updateDetalleCompraRequest,
  deleteDetalleCompraRequest,
  // Inventario
  getInventarioRequest,
  getRegistroInventarioRequest,
  createRegistroInventarioRequest,
  updateRegistroInventarioRequest,
  deleteRegistroInventarioRequest,
} from "../api/productos";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};

export function AppProvider({ children }) {
  const [data, setData] = useState({
    piezas: [],
    ordenesServicio: [],
    usuarios: [],
    compras: [],
    detallesCompra: [],
    inventario: [],
  });

  // === Piezas/Repuestos ===
  const getPiezasRepuestos = async () => {
    try {
      const res = await getPiezasRepuestosRequest();
      setData((prev) => ({ ...prev, piezas: res }));
    } catch (error) {
      console.error("Error obteniendo piezas:", error);
    }
  };

  const getPiezaRepuesto = async (id) => await getPiezaRepuestoRequest(id);

  const createPiezaRepuesto = async (piezaData) => {
    try {
      const res = await createPiezaRepuestoRequest(piezaData);
      setData((prev) => ({ ...prev, piezas: [...prev.piezas, res] }));
    } catch (error) {
      console.error("Error creando pieza:", error);
    }
  };

  const updatePiezaRepuesto = async (id, piezaData) => {
    try {
      const res = await updatePiezaRepuestoRequest(id, piezaData);
      setData((prev) => ({
        ...prev,
        piezas: prev.piezas.map((pieza) =>
          pieza.id === id ? res : pieza
        ),
      }));
    } catch (error) {
      console.error("Error actualizando pieza:", error);
    }
  };

  const deletePiezaRepuesto = async (id) => {
    try {
      await deletePiezaRepuestoRequest(id);
      setData((prev) => ({
        ...prev,
        piezas: prev.piezas.filter((pieza) => pieza.id !== id),
      }));
    } catch (error) {
      console.error("Error eliminando pieza:", error);
    }
  };

  // === Órdenes de Servicio ===
  const getOrdenesServicio = async () => {
    try {
      const res = await getOrdenesServicioRequest();
      setData((prev) => ({ ...prev, ordenesServicio: res }));
    } catch (error) {
      console.error("Error obteniendo órdenes de servicio:", error);
    }
  };

  const getOrdenServicio = async (id) => await getOrdenServicioRequest(id);

  const createOrdenServicio = async (ordenData) => {
    try {
      const res = await createOrdenServicioRequest(ordenData);
      setData((prev) => ({
        ...prev,
        ordenesServicio: [...prev.ordenesServicio, res],
      }));
    } catch (error) {
      console.error("Error creando orden:", error);
    }
  };

  const updateOrdenServicio = async (id, ordenData) => {
    try {
      const res = await updateOrdenServicioRequest(id, ordenData);
      setData((prev) => ({
        ...prev,
        ordenesServicio: prev.ordenesServicio.map((orden) =>
          orden.id === id ? res : orden
        ),
      }));
    } catch (error) {
      console.error("Error actualizando orden:", error);
    }
  };

  const deleteOrdenServicio = async (id) => {
    try {
      await deleteOrdenServicioRequest(id);
      setData((prev) => ({
        ...prev,
        ordenesServicio: prev.ordenesServicio.filter((orden) => orden.id !== id),
      }));
    } catch (error) {
      console.error("Error eliminando orden:", error);
    }
  };

  // === Usuarios ===
  const getUsuarios = async () => {
    try {
      const res = await getUsuariosRequest();
      setData((prev) => ({ ...prev, usuarios: res }));
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
    }
  };

  const getUsuario = async (id) => await getUsuarioRequest(id);

  const createUsuario = async (userData) => {
    try {
      const res = await createUsuarioRequest(userData);
      setData((prev) => ({
        ...prev,
        usuarios: [...prev.usuarios, res],
      }));
    } catch (error) {
      console.error("Error creando usuario:", error);
    }
  };

  const updateUsuario = async (id, userData) => {
    try {
      const res = await updateUsuarioRequest(id, userData);
      setData((prev) => ({
        ...prev,
        usuarios: prev.usuarios.map((user) =>
          user.id === id ? res : user
        ),
      }));
    } catch (error) {
      console.error("Error actualizando usuario:", error);
    }
  };

  const deleteUsuario = async (id) => {
    try {
      await deleteUsuarioRequest(id);
      setData((prev) => ({
        ...prev,
        usuarios: prev.usuarios.filter((user) => user.id !== id),
      }));
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    }
  };

  // === Compras ===
  const getCompras = async () => {
    try {
      const res = await getComprasRequest();
      setData((prev) => ({ ...prev, compras: res }));
    } catch (error) {
      console.error("Error obteniendo compras:", error);
    }
  };

  const getCompra = async (id) => await getCompraRequest(id);

  const createCompra = async (compraData) => {
    try {
      const res = await createCompraRequest(compraData);
      setData((prev) => ({
        ...prev,
        compras: [...prev.compras, res],
      }));
    } catch (error) {
      console.error("Error creando compra:", error);
    }
  };

  const updateCompra = async (id, compraData) => {
    try {
      const res = await updateCompraRequest(id, compraData);
      setData((prev) => ({
        ...prev,
        compras: prev.compras.map((compra) =>
          compra.id === id ? res : compra
        ),
      }));
    } catch (error) {
      console.error("Error actualizando compra:", error);
    }
  };

  const deleteCompra = async (id) => {
    try {
      await deleteCompraRequest(id);
      setData((prev) => ({
        ...prev,
        compras: prev.compras.filter((compra) => compra.id !== id),
      }));
    } catch (error) {
      console.error("Error eliminando compra:", error);
    }
  };

  // === Detalles de Compra ===
  const getDetallesCompra = async () => {
    try {
      const res = await getDetallesCompraRequest();
      setData((prev) => ({ ...prev, detallesCompra: res }));
    } catch (error) {
      console.error("Error obteniendo detalles de compra:", error);
    }
  };

  const getDetalleCompra = async (id) => await getDetalleCompraRequest(id);

  const createDetalleCompra = async (detalleData) => {
    try {
      const res = await createDetalleCompraRequest(detalleData);
      setData((prev) => ({
        ...prev,
        detallesCompra: [...prev.detallesCompra, res],
      }));
    } catch (error) {
      console.error("Error creando detalle de compra:", error);
    }
  };

  const updateDetalleCompra = async (id, detalleData) => {
    try {
      const res = await updateDetalleCompraRequest(id, detalleData);
      setData((prev) => ({
        ...prev,
        detallesCompra: prev.detallesCompra.map((detalle) =>
          detalle.id === id ? res : detalle
        ),
      }));
    } catch (error) {
      console.error("Error actualizando detalle de compra:", error);
    }
  };

  const deleteDetalleCompra = async (id) => {
    try {
      await deleteDetalleCompraRequest(id);
      setData((prev) => ({
        ...prev,
        detallesCompra: prev.detallesCompra.filter((detalle) => detalle.id !== id),
      }));
    } catch (error) {
      console.error("Error eliminando detalle de compra:", error);
    }
  };

  // === Inventario ===
  const getInventario = async () => {
    try {
      const res = await getInventarioRequest();
      setData((prev) => ({ ...prev, inventario: res }));
    } catch (error) {
      console.error("Error obteniendo inventario:", error);
    }
  };

  const getRegistroInventario = async (id) =>
    await getRegistroInventarioRequest(id);

  const createRegistroInventario = async (registroData) => {
    try {
      const res = await createRegistroInventarioRequest(registroData);
      setData((prev) => ({
        ...prev,
        inventario: [...prev.inventario, res],
      }));
    } catch (error) {
      console.error("Error creando registro de inventario:", error);
    }
  };

  const updateRegistroInventario = async (id, registroData) => {
    try {
      const res = await updateRegistroInventarioRequest(id, registroData);
      setData((prev) => ({
        ...prev,
        inventario: prev.inventario.map((registro) =>
          registro.id === id ? res : registro
        ),
      }));
    } catch (error) {
      console.error("Error actualizando registro de inventario:", error);
    }
  };

  const deleteRegistroInventario = async (id) => {
    try {
      await deleteRegistroInventarioRequest(id);
      setData((prev) => ({
        ...prev,
        inventario: prev.inventario.filter((registro) => registro.id !== id),
      }));
    } catch (error) {
      console.error("Error eliminando registro de inventario:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        data,
        getPiezasRepuestos,
        getPiezaRepuesto,
        createPiezaRepuesto,
        updatePiezaRepuesto,
        deletePiezaRepuesto,
        getOrdenesServicio,
        getOrdenServicio,
        createOrdenServicio,
        updateOrdenServicio,
        deleteOrdenServicio,
        getUsuarios,
        getUsuario,
        createUsuario,
        updateUsuario,
        deleteUsuario,
        getCompras,
        getCompra,
        createCompra,
        updateCompra,
        deleteCompra,
        getDetallesCompra,
        getDetalleCompra,
        createDetalleCompra,
        updateDetalleCompra,
        deleteDetalleCompra,
        getInventario,
        getRegistroInventario,
        createRegistroInventario,
        updateRegistroInventario,
        deleteRegistroInventario,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
