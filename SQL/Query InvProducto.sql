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
    codFactura INT PRIMARY KEY IDENTITY not null,
    fecha DATE,
    total FLOAT
);

-- Crear la tabla "DetalleFactura" con relaciones con FLOAT
CREATE TABLE detalleProducto (
    cod INT PRIMARY KEY IDENTITY not null,
    codFactura INT, -- Esta columna se utiliza para relacionar con la tabla "Factura"
    codProducto INT, -- Esta columna se utiliza para relacionar con la tabla "Producto"
    nombreProducto NVARCHAR(50),
	precio FLOAT,
    cantidad INT,
    subtotal FLOAT
);

-- Establecer la relación entre "DetalleFactura" y "Factura"
ALTER TABLE detalleProducto
ADD CONSTRAINT FK_detalleProducto_factura FOREIGN KEY (codFactura) REFERENCES factura(codFactura);

-- Establecer la relación entre "DetalleFactura" y "Producto"
ALTER TABLE detalleProducto
ADD CONSTRAINT FK_detalleProducto_producto FOREIGN KEY (codProducto) REFERENCES producto(codProducto);

insert into producto(nombreProducto, precioVenta, costoUnitatio, unidadesExistente, cantidadMinima, cantidadMaxima, Estado) values
('pan', 20, 15, 5, 10, 15, 'habilitado')
select * from producto