--TABLA DE LA PARTE 4 DE HERNAN 

CREATE TABLE estado_envio (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50)
    );

CREATE TABLE envio (
        id SERIAL PRIMARY KEY,
        encomienda_id INT UNIQUE REFERENCES encomienda (id),
        sucursal_origen_id INT REFERENCES sucursal (id),
        sucursal_destino_id INT REFERENCES sucursal (id),
        fecha_envio TIMESTAMP,
        fecha_estimada TIMESTAMP,
        costo DECIMAL(10, 2),
        estado_id INT REFERENCES estado_envio (id)
    );

CREATE TABLE seguimiento (
        id SERIAL PRIMARY KEY,
        envio_id INT REFERENCES envio (id),
        estado_id INT REFERENCES estado_envio (id),
        ubicacion TEXT,
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        observaciones TEXT
    );

CREATE TABLE entrega (
        id SERIAL PRIMARY KEY,
        envio_id INT UNIQUE REFERENCES envio (id),
        fecha_entrega TIMESTAMP,
        nombre_recibe VARCHAR(100),
        ci_recibe VARCHAR(20),
        firma TEXT
    );

--Cuarta parte de la tabla

CREATE TABLE usuario (
        id SERIAL PRIMARY KEY,
        nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        rol VARCHAR(50),
        estado BOOLEAN DEFAULT TRUE
    );

CREATE TABLE empleado (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100),
        apellido VARCHAR(100),
        cargo VARCHAR(100),
        telefono VARCHAR(20),
        sucursal_id INT REFERENCES sucursal (id)
    );

CREATE TABLE pago (
        id SERIAL PRIMARY KEY,
        envio_id INT REFERENCES envio (id),
        monto DECIMAL(10, 2),
        metodo VARCHAR(50),
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE factura (
        id SERIAL PRIMARY KEY,
        pago_id INT UNIQUE REFERENCES pago (id),
        numero_factura VARCHAR(50),
        nit VARCHAR(20),
        razon_social VARCHAR(150),
        fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );