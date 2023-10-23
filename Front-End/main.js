let data = [];
$(document).ready(function () {
	let tblfacturas = $('#tbl-facturas').DataTable({
		data: data,
		columns: [
			{ data: 'codFactura', title: 'Codigo de Factura' },
			{ data: 'fecha', title: 'Fecha de Facturacion' },
			{ data: 'total', title: 'Total' },
			{
				title: 'Acciones',
				data: null,
				render: function (data, type, row) {
					// Agregamos un botón centrado utilizando clases de Bootstrap
					return '<button class="btn btn-primary btn-sm mx-auto">Ver</button>';
				}
			}

		],
		paging: true,
		searching: true,
		ordering: true,
		lengthChange: false,
		info: false,
		language: {
			url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
		},
	});
	// let tblProductos = $('#tbl-Productos').DataTable({
	// 	data: data,
	// 	columns: [
	// 		{ data: 'codFactura', title: 'Codigo de Factura' },
	// 		{ data: 'fecha', title: 'Fecha de Facturacion' },
	// 		{ data: 'total', title: 'Total' }
	// 	],
	// 	paging: true,
	// 	searching: true,
	// 	ordering: true,
	// 	lengthChange: false,
	// 	info: false,
	// 	language: {
	// 		url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json',
	// 	},
	// });


	$('#tbl-facturas').on('click', 'button', function () {
		// Obtén la fila correspondiente al botón clickeado
		var dataRow = tblfacturas.row($(this).closest('tr')).data();

		// Extrae la información de la fila
		var codFactura = dataRow.codFactura;
		var fecha = dataRow.fecha;
		var total = dataRow.total;

		// Lógica adicional con los datos de la fila
		alert('Hiciste clic en el botón en la fila con Código de Factura: ' + codFactura +
			', Fecha: ' + fecha + ', Total: ' + total);

		alertify.confirm('', function () { })
			.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Modificar Tipo Identificacion</div>')
			.resizeTo('500px', 'auto')
			.set('closable', false)
			.set('resizable', false)
			.setContent('formIdentificacion')
			.set({
				labels: { "ok": "SI", "cancel": "NO" },
				onok: function () {
					let idModificar = $('#input-CodIdentificacion').val();
					let nuevadescripcion = $('#input-DescripIdentificacion').val();
					// Encuentra el registro en el array y modifica la descripción
					let registroModificar = dataIdentificacion.find(registro => registro.codTipoIdentificacion == idModificar);
					if (registroModificar) {
						registroModificar.descripcion = nuevadescripcion;
						// Actualiza la fila en la tabla y cierra el modal
						resetTableIdentificacion();
						limpiarFormularios();
					} else {
						alertify.error('El registro a modificar no pudo ser encontrado.');
					}
				}
			})

	});


	fetchDataFactura().then(() => {
		tblfacturas.clear();
		tblfacturas.rows.add(data).draw();
	});
});


async function fetchDataFactura() {
	try {
		const response = await fetch('http://localhost:5269/api/Factura/Lista'); // Reemplaza la URL con la de la API que desees consultar.
		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.status}`);
		}
		const result = await response.json();
		if (result.response) {
			data = result.response; // Almacena los datos en la variable 'data'
			console.log('Datos de la API:', data);
			debugger;
		}
	} catch (error) {
		console.error('Se produjo un error al obtener los datos de la API:', error);
		debugger
	}
}

async function fetchDataProducto() {
	try {
		const response = await fetch('http://localhost:5269/api/Producto/Lista'); // Reemplaza la URL con la de la API que desees consultar.
		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.status}`);
		}
		const result = await response.json();
		if (result.response) {
			data = result.response; // Almacena los datos en la variable 'data'
			console.log('Datos de la API:', data);
			debugger;
		}
	} catch (error) {
		console.error('Se produjo un error al obtener los datos de la API:', error);
		debugger
	}
}

async function fetchDataDetalleFactura() {
	try {
		const response = await fetch(`http://localhost:5269/api/DetalleFactura/DetalleFactura?codFactura=${1}`); // Reemplaza la URL con la de la API que desees consultar.
		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.status}`);
		}
		const result = await response.json();
		if (result.response) {
			data = result.response; // Almacena los datos en la variable 'data'
			console.log('Datos de la API:', data);
			debugger;
		}
	} catch (error) {
		console.error('Se produjo un error al obtener los datos de la API:', error);
		debugger
	}
}