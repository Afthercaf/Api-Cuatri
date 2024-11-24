
import {db} from '../DBS/database.js';

// Obtener todas las piezas/repuestos
export const allpiezas_repuestos = async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM piezas_repuestos');
      res.json(rows);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Obtener una pieza/repuesto por ID
export const onepiezas_repuestos = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Piezas_Repuestos WHERE id_pieza = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Pieza no encontrada' });
        }
        res.status(200).json(results[0]);
    });
};

// Crear una nueva pieza/repuesto (POST)
export const Postpiezas_repuestos = async (req, res) => {
    const { nombre_pieza, descripcion, precio, cantidad_disponible, fecha_ingreso, categoria, imagen_url } = req.body;
    
    const query = `
        INSERT INTO piezas_repuestos (nombre_pieza, descripcion, precio, cantidad_disponible, fecha_ingreso, categoria, imagen_url) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [nombre_pieza, descripcion, precio, cantidad_disponible, fecha_ingreso, categoria, imagen_url], 
    (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Pieza creada con éxito', id: result.insertId });
    });
};

// Actualizar una pieza/repuesto (PUT)
export const PUTpiezas_repuestos = async (req, res) => {
    const { id } = req.params;
    const { nombre_pieza, descripcion, precio, cantidad_disponible, fecha_ingreso, categoria } = req.body;
    const query = `UPDATE Piezas_Repuestos SET nombre_pieza = ?, descripcion = ?, precio = ?, cantidad_disponible = ?, fecha_ingreso = ?, categoria = ? 
                   WHERE id_pieza = ?`;
    db.query(query, [nombre_pieza, descripcion, precio, cantidad_disponible, fecha_ingreso, categoria, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pieza no encontrada' });
        }
        res.status(200).json({ message: 'Pieza actualizada con éxito' });
    });
}

// Eliminar una pieza/repuesto (DELETE)
export const delitepiezas_repuestos = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Piezas_Repuestos WHERE id_pieza = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Pieza no encontrada' });
        }
        res.status(200).json({ message: 'Pieza eliminada con éxito' });
    });
};

export const Allordenes_servicio = async (req, res) => {
    const query = 'SELECT * FROM Ordenes_Servicio';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

export const oneordenes_servicio = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Ordenes_Servicio WHERE id_orden = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Orden de servicio no encontrada' });
        }
        res.status(200).json(results[0]);
    });
};

// Crear una nueva orden de servicio (POST)
export const POSTordenes_servicio = async (req, res) => {
    const { id_usuario, id_pieza, fecha_servicio, estado, total } = req.body;
    const query = `INSERT INTO Ordenes_Servicio (id_usuario, id_pieza, fecha_servicio, estado, total) 
                   VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [id_usuario, id_pieza, fecha_servicio, estado, total], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Orden de servicio creada con éxito', id: result.insertId });
    });
};

// Actualizar una orden de servicio (PUT)
export const PUTordenes_servicio = async (req, res) => {
    const { id } = req.params;
    const { id_usuario, id_pieza, fecha_servicio, estado, total } = req.body;
    const query = `UPDATE Ordenes_Servicio SET id_usuario = ?, id_pieza = ?, fecha_servicio = ?, estado = ?, total = ? 
                   WHERE id_orden = ?`;
    db.query(query, [id_usuario, id_pieza, fecha_servicio, estado, total, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Orden de servicio no encontrada' });
        }
        res.status(200).json({ message: 'Orden de servicio actualizada con éxito' });
    });
};

// Eliminar una orden de servicio (DELETE)
export const DELETEordenes_servicio = async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Ordenes_Servicio WHERE id_orden = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Orden de servicio no encontrada' });
        }
        res.status(200).json({ message: 'Orden de servicio eliminada con éxito' });
    });
};

/////////


// Obtener todos los usuarios
export const allUsuario = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener un usuario por ID
// En tu archivo de rutas o controlador
// Obtener un usuario por ID
export const oneUsuario = async (req, res) => {
    const { id } = req.params; // Obtener el ID del usuario de los parámetros

    try {
        const [users] = await db.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id]); // Usar await

        if (users.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(users[0]); // Devolver los datos del usuario encontrado
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};



// Crear un nuevo usuario
export const POSTUsuario = async  (req, res) => {
    const { nombre, email, telefono, direccion } = req.body;
    const query = `INSERT INTO Usuarios (nombre, email, telefono, direccion, fecha_registro) 
                   VALUES (?, ?, ?, ?, CURDATE())`;
    db.query(query, [nombre, email, telefono, direccion], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Usuario creado con éxito', id: result.insertId });
    });
};


// Actualizar un usuario
export const PUTUsuario = async  (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono, direccion, rol, fecha_registro } = req.body;
    const query = `UPDATE Usuarios SET nombre = ?, email = ?, telefono = ?, direccion = ?, rol = ?, fecha_registro = ? 
                   WHERE id_usuario = ?`;
    db.query(query, [nombre, email, telefono, direccion, rol, fecha_registro, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado con éxito' });
    });
};

// Eliminar un usuario
export const DELETEUsuario = async  (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Usuarios WHERE id_usuario = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    });
};


// Obtener todas las compras
export const allcompras = async  (req, res) => {
    const query = 'SELECT * FROM Compras';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener una compra por ID
export const oneecompras = async (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Compras WHERE id_compra = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(200).json(results[0]);
    });
};

// Crear una nueva compra
export const postcompras = async  (req, res) => {
    const { id_usuario, fecha_compra, total_compra, estado } = req.body;
    const query = `INSERT INTO Compras (id_usuario, fecha_compra, total_compra, estado) 
                   VALUES (?, ?, ?, ?)`;
    db.query(query, [id_usuario, fecha_compra, total_compra, estado], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Compra creada con éxito', id: result.insertId });
    });
};

// Actualizar una compra
export const PUTcompras = async  (req, res) => {
    const { id } = req.params;
    const { id_usuario, fecha_compra, total_compra, estado } = req.body;
    const query = `UPDATE Compras SET id_usuario = ?, fecha_compra = ?, total_compra = ?, estado = ? 
                   WHERE id_compra = ?`;
    db.query(query, [id_usuario, fecha_compra, total_compra, estado, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(200).json({ message: 'Compra actualizada con éxito' });
    });
};

// Eliminar una compra
export const  DELETEcompras = async  (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Compras WHERE id_compra = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(200).json({ message: 'Compra eliminada con éxito' });
    });
};

// Obtener todos los detalles de compra
export const Alldetalle_compra = async  (req, res) => {
    const query = 'SELECT * FROM Detalle_Compra';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener un detalle de compra por ID
export const onedetalle_compra = async  (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Detalle_Compra WHERE id_detalle = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Detalle de compra no encontrado' });
        }
        res.status(200).json(results[0]);
    });
};

// Crear un nuevo detalle de compra
export const postdetalle_compra = async (req, res) => {
    const { id_compra, id_pieza, cantidad, precio_unitario, subtotal } = req.body;
    const query = `INSERT INTO Detalle_Compra (id_compra, id_pieza, cantidad, precio_unitario, subtotal) 
                   VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [id_compra, id_pieza, cantidad, precio_unitario, subtotal], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Detalle de compra creado con éxito', id: result.insertId });
    });
};

// Actualizar un detalle de compra
export const PUTdetalle_compra = async  (req, res) => {
    const { id } = req.params;
    const { id_compra, id_pieza, cantidad, precio_unitario, subtotal } = req.body;
    const query = `UPDATE Detalle_Compra SET id_compra = ?, id_pieza = ?, cantidad = ?, precio_unitario = ?, subtotal = ? 
                   WHERE id_detalle = ?`;
    db.query(query, [id_compra, id_pieza, cantidad, precio_unitario, subtotal, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Detalle de compra no encontrado' });
        }
        res.status(200).json({ message: 'Detalle de compra actualizado con éxito' });
    });
};

// Eliminar un detalle de compra
export const deletedetalle_compra = async  (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Detalle_Compra WHERE id_detalle = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Detalle de compra no encontrado' });
        }
        res.status(200).json({ message: 'Detalle de compra eliminado con éxito' });
    });
};


// Obtener todo el inventario
export const ALLinventario = async  (req, res) => {
    const query = 'SELECT * FROM Inventario';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
};

// Obtener un registro de inventario por ID
export const ONEinventario = async  (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Inventario WHERE id_inventario = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Registro de inventario no encontrado' });
        }
        res.status(200).json(results[0]);
    });
};

// Crear un nuevo registro de inventario
export const POSTinventario = async  (req, res) => {
    const { id_pieza, cantidad_ingresada, fecha_actualizacion, id_admin } = req.body;
    const query = `INSERT INTO Inventario (id_pieza, cantidad_ingresada, fecha_actualizacion, id_admin) 
                   VALUES (?, ?, ?, ?)`;
    db.query(query, [id_pieza, cantidad_ingresada, fecha_actualizacion, id_admin], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Registro de inventario creado con éxito', id: result.insertId });
    });
};

// Actualizar un registro de inventario
export const PUTinventario = async  (req, res) => {
    const { id } = req.params;
    const { id_pieza, cantidad_ingresada, fecha_actualizacion, id_admin } = req.body;
    const query = `UPDATE Inventario SET id_pieza = ?, cantidad_ingresada = ?, fecha_actualizacion = ?, id_admin = ? 
                   WHERE id_inventario = ?`;
    db.query(query, [id_pieza, cantidad_ingresada, fecha_actualizacion, id_admin, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro de inventario no encontrado' });
        }
        res.status(200).json({ message: 'Registro de inventario actualizado con éxito' });
    });
};

// Eliminar un registro de inventario
export const deleteinventario = async  (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Inventario WHERE id_inventario = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Registro de inventario no encontrado' });
        }
        res.status(200).json({ message: 'Registro de inventario eliminado con éxito' });
    });
};


