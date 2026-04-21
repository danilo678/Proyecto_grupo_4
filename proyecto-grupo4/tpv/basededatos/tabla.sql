--TABLA DE LA PARTE 4 DE HERNAN

CREATE TABLE estado_envio (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50)
);
CREATE TABLE envio (
    id SERIAL PRIMARY KEY,
    encomienda_id INT UNIQUE REFERENCES encomienda(id),
    sucursal_origen_id INT REFERENCES sucursal(id),
    sucursal_destino_id INT REFERENCES sucursal(id),
    fecha_envio TIMESTAMP,
    fecha_estimada TIMESTAMP,
    costo DECIMAL(10,2),
    estado_id INT REFERENCES estado_envio(id)
);
CREATE TABLE seguimiento (
    id SERIAL PRIMARY KEY,
    envio_id INT REFERENCES envio(id),
    estado_id INT REFERENCES estado_envio(id),
    ubicacion TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observaciones TEXT
);
CREATE TABLE entrega (
    id SERIAL PRIMARY KEY,
    envio_id INT UNIQUE REFERENCES envio(id),
    fecha_entrega TIMESTAMP,
    nombre_recibe VARCHAR(100),
    ci_recibe VARCHAR(20),
    firma TEXT
);