CREATE DATABASE IF NOT EXISTS aromaacafe_db;
USE aromaacafe_db;

-- =============================
-- TABLA: ROLES
-- =============================
CREATE TABLE roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(50) NOT NULL UNIQUE,
    apellidos VARCHAR(50) NOT NULL UNIQUE
);

-- =============================
-- TABLA: USUARIOS
-- =============================
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100),
    telefono VARCHAR(20),
    contraseña VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_rol)
        REFERENCES roles(id_rol)
);

-- =============================
-- TABLA: PRODUCTOS
-- =============================

CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    imagen VARCHAR(255),
    categoria ENUM('BEBIDAS CALIENTES','BEBIDAS FRIAS','POSTRES') NOT NULL,
    disponible BOOLEAN DEFAULT TRUE
);

-- =============================
-- TABLA: PROMOCIONES
-- =============================

CREATE TABLE promociones (
    id_promocion INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    descuento DECIMAL(5,2),
    fecha_inicio DATE,
    fecha_fin DATE,
    activa BOOLEAN DEFAULT TRUE
);

-- =============================
-- TABLA: PEDIDOS
-- =============================
CREATE TABLE pedidos (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    nombres_cliente varchar(100) NOT NULL,
    apellidos_cliente varchar(100) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10,2),
    estado ENUM(
        'Pendiente',
        'Preparando',
        'Listo',
        'Entregado',
        'Cancelado'
    ) DEFAULT 'Pendiente',

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);

-- =============================
-- TABLA: DETALLE PEDIDO
-- =============================
CREATE TABLE detalle_pedido (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2),

    FOREIGN KEY (id_pedido)
        REFERENCES pedidos(id_pedido),

    FOREIGN KEY (id_producto)
        REFERENCES productos(id_producto)
);

-- =============================
-- TABLA: PUNTOS
-- =============================
CREATE TABLE puntos (
    id_puntos INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    puntos INT DEFAULT 0,

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario)
);

-- =============================
-- TABLA: RECOMPENSAS
-- =============================
CREATE TABLE recompensas (
    id_recompensa INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    descripcion TEXT,
    puntos_necesarios INT
);

-- =============================
-- TABLA: CANJE DE RECOMPENSAS
-- =============================
CREATE TABLE canjes (
    id_canje INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_recompensa INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario),

    FOREIGN KEY (id_recompensa)
        REFERENCES recompensas(id_recompensa)
);