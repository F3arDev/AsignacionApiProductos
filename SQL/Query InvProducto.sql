create database invProducto;

use invProducto;

Create table producto(
	codProducto int primary key identity(1,1) not null,
	nombreProducto varchar(50),
	precioVenta float,
	costoUnitatio float,
	unidadesExistente int,
	cantidadMinima int,
	cantidadMaxima int,
	Estado varchar(25)
);

-- Crear la tabla "Factura" con FLOAT
CREATE TABLE factura (
    codFactura INT PRIMARY KEY IDENTITY(1,1) not null,
    fecha DATE,
    total FLOAT
);

-- Crear la tabla "DetalleFactura" con relaciones con FLOAT
CREATE TABLE detalleFactura (
    cod INT PRIMARY KEY IDENTITY(1,1) not null,
    codFactura INT, -- Esta columna se utiliza para relacionar con la tabla "Factura"
    codProducto INT, -- Esta columna se utiliza para relacionar con la tabla "Producto"
    nombreProducto NVARCHAR(50),
	precio FLOAT,
    cantidad INT,
    subtotal FLOAT,
	FOREIGN KEY (codFactura) REFERENCES factura(codFactura),
	FOREIGN KEY (codProducto) REFERENCES producto(codProducto)
);


insert into producto(nombreProducto, precioVenta, costoUnitatio, unidadesExistente, cantidadMinima, cantidadMaxima, Estado) values
	('pan', 20, 15, 5, 10, 15, 'habilitado'),
    ('leche', 10, 7, 100, 20, 200, 'Habilitado'),
    ('azucar', 15, 12, 50, 10, 100, 'Habilitado');


-- Insertar datos en la tabla "Factura"
INSERT INTO factura (fecha, total)
VALUES
    ('2023-10-01', 75),
    ('2023-10-02', 110),
    ('2023-10-03', 45);

-- Insertar datos en la tabla "DetalleFactura"
INSERT INTO detalleFactura (codFactura, codProducto, nombreProducto, precio, cantidad, subtotal)
VALUES
    (1, 1, 'pan', 10, 5, 52),
    (1, 2, 'leche', 15, 3, 47),
    (2, 1, 'Producto A', 10, 2, 21),
    (2, 3, 'azucar', 20, 4, 81);


select * from producto

select * from factura

select * from detalleProducto

EXEC sp_rename 'detalleProducto', 'detalleFactura'