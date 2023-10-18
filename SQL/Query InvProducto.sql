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

Create table factura(
numeroFactura int primary key identity(1,1),
fecha date,
detalleProducto int

Foreign key (detalleProducto) references Producto (codProducto) 
)

insert into producto(nombreProducto, precioVenta, costoUnitatio, unidadesExistente, cantidadMinima, cantidadMaxima, Estado) values
('pan', 20, 15, 5, 10, 15, 'habilitado')
select * from producto

/*create table detalleProducto(
NombreProducto varchar(50),

)