# 📦 Sistema de Gestión de Encomiendas (SGE) - API REST

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

## 👥 Información del Grupo
**Grupo:** 4  
**Estudiantes:**
*   Percy Hernán Laime
*   Danilo Aramayo Garisto
*   Sandra Carlos Garcia
*   Baltasar Junior Colque Huarachi

---

## 📝 Descripción del Proyecto
Este sistema es una solución backend integral desarrollada para la gestión de una empresa de transporte de encomiendas. Permite la administración eficiente de clientes, sucursales, envíos, rastreo en tiempo real, procesos de pago y facturación legal.

El proyecto ha sido construido siguiendo una arquitectura modular en **NestJS**, garantizando escalabilidad, mantenibilidad y una sólida integridad de datos mediante el uso de **TypeORM** y **PostgreSQL**.

### Módulos Principales
*   **Gestión de Clientes:** Administración de perfiles y múltiples contactos por cliente.
*   **Gestión de Sucursales:** Control de puntos de origen y destino.
*   **Gestión de Encomiendas:** Registro detallado de paquetes, pesos, volúmenes y seguros.
*   **Gestión de Envíos:** Generación de rutas logísticas entre sucursales.
*   **Seguimiento (Tracking):** Historial completo de cambios de estado y registro de entrega final.
*   **Pagos y Facturación:** Manejo de diversos métodos de pago y generación automática de facturas (Relación 1:1).
*   **Gestión de Usuarios y Empleados:** Control de acceso y asignación de personal a sucursales.

---

## 🚀 Tecnologías Utilizadas
*   **Framework:** [NestJS](https://nestjs.com/) (v11)
*   **Lenguaje:** TypeScript
*   **Base de Datos:** PostgreSQL
*   **ORM:** TypeORM
*   **Documentación:** Swagger
*   **Validación:** Class-Validator & Class-Transformer
*   **Pruebas:** Jest

---

## ⚙️ Configuración e Instalación

### 1. Requisitos Previos
*   Node.js (v18 o superior)
*   PostgreSQL (v14 o superior)
*   NPM 

### 2. Instalación de Dependencias
```bash
cd partelogica
npm install
```

### 3. Configuración de la Base de Datos
1. Crear una base de datos en PostgreSQL llamada `sgebd`.
2. Ejecutar los scripts SQL o Bash ubicados en la carpeta `/basededatos`:
    *   Editar el Bash cambiando tu PGPASSWORD=TU CONTRASEÑA y ejecutar:
        el archivo ./init.sh en la terminal.
    O hacerlo de manera manual:
    *   Primero: `tablas.sql` (Estructura de tablas y relaciones).
    *   Segundo: `datos.sql` (Datos iniciales y estados).
3. Verificar la configuración de conexión en `partelogica/src/app.module.ts`:
```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'YOUR_PASSWORD',
  database: 'sgebd',
  // ...
})
```

---

## 🏃‍♂️ Ejecución del Proyecto

### Desarrollo
```bash
npm run start:dev
```
La aplicación estará disponible en: `http://localhost:3000`

### Pruebas Unitarias
El sistema cuenta con una cobertura completa de los servicios principales (61 tests exitosos).
```bash
npm run test
```

---

## 📖 Documentación de la API (Swagger)
Una vez iniciada la aplicación, puede acceder a la documentación interactiva y probar los endpoints en:
👉 **[http://localhost:3000/api](http://localhost:3000/api)**

---

## 🏗️ Estructura del Proyecto
El código sigue una arquitectura modular y escalable:
*   `src/cliente`: Gestión de clientes y contactos.
*   `src/sucursal`: Administración de locales.
*   `src/encomienda`: Lógica de paquetes y seguros.
*   `src/envio`: Motor de logística y costos.
*   `src/seguimiento`: Tracking y entregas.
*   `src/pago` / `src/factura`: Módulo financiero.
*   `src/common`: Entidades compartidas, usuarios y empleados.

---

## 🚀 Pasos de Despliegue (Producción)
1.  **Build del proyecto:** Generar la versión compilada en JavaScript.
    ```bash
    npm run build
    ```
2.  **Variables de Entorno:** Configurar las variables de entorno para la base de datos de producción.
3.  **Ejecución:**
    ```bash
    npm run start:prod
    ```
4.  **Recomendación:** Se recomienda el uso de un gestor de procesos como **PM2** y un proxy inverso como **Nginx**.

---
<p align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDZ4xop88S41OpS2AnVpj2cbzuvt_pdCkYA&s" width="500" alt="Unior Logo" />
</p>
                        *UNIVERSIDAD PRIVADA DE ORURO "UNIOR - 2026"*
