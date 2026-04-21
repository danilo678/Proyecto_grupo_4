

--PARTE 4 DE HERNAN 
-- ESTADOS
INSERT INTO estado_envio (nombre) VALUES
('Registrado'),
('En tránsito'),
('Entregado');
-- ENVÍOS
INSERT INTO envio (encomienda_id, sucursal_origen_id, sucursal_destino_id, fecha_envio, fecha_estimada,
costo, estado_id)
VALUES
(1, 1, 2, NOW(), NOW() + INTERVAL '2 days', 50, 2),
(2, 2, 3, NOW(), NOW() + INTERVAL '3 days', 30, 1),
(3, 1, 3, NOW(), NOW() + INTERVAL '1 day', 70, 3);
-- SEGUIMIENTO
INSERT INTO seguimiento (envio_id, estado_id, ubicacion, observaciones) VALUES
(1, 1, 'La Paz', 'Recepción'),
(1, 2, 'En camino', 'Transporte terrestre'),
(3, 3, 'Santa Cruz', 'Entregado correctamente');
-- ENTREGA
INSERT INTO entrega (envio_id, fecha_entrega, nombre_recibe, ci_recibe, firma) VALUES
(3, NOW(), 'Juan Perez', '123456', 'FirmaDigital');

--Cuarta parte de la tabla

-- USUARIOS
INSERT INTO usuario (nombre_usuario, password, rol) VALUES
('admin', '123', 'admin'),
('operador1', '123', 'operador');
-- EMPLEADOS
INSERT INTO empleado (nombre, apellido, cargo, telefono, sucursal_id) VALUES
('Luis', 'Gomez', 'Cajero', '77788888', 1),
('Ana', 'Martinez', 'Operador', '77799999', 2);
-- PAGOS
INSERT INTO pago (envio_id, monto, metodo) VALUES
(1, 50, 'Efectivo'),
(2, 30, 'QR'),
(3, 70, 'Tarjeta');
-- FACTURAS
INSERT INTO factura (pago_id, numero_factura, nit, razon_social) VALUES
(1, 'F001', '1234567', 'Juan Perez'),
(3, 'F002', '7654321', 'Carlos Quispe');
