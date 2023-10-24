let dataProducto = [];
let dataFactura = [];
let dataDetFactura = [];
$(document).ready(function () {

	fetchDataFactura().then(async () => {
		tblfacturas.clear();
		await tblfacturas.rows.add(dataFactura).draw();
	});

	fetchDataProducto().then(async () => {
		tblProductos.clear();
		await tblProductos.rows.add(dataProducto).draw();
	});

	let tblfacturas = $('#tbl-facturas').DataTable({
		data: dataFactura,
		columns: [
			{ data: 'codFactura', title: 'Codigo de Factura' },
			{ data: 'fecha', title: 'Fecha de Facturacion' },
			{ data: 'total', title: 'Total' },
			{
				title: 'Acciones',
				data: null,
				render: function (data, type, row) {
					// Agregamos un botón centrado utilizando clases de Bootstrap
					return '<button class="btn btn-primary btn-sm mx-auto verFact-btn">Ver</button>';
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

	let tblProductos = $('#tbl-Productos').DataTable({
		data: dataProducto,
		columns: [
			{ data: 'codProducto', title: 'Cod' },
			{ data: 'nombreProducto', title: 'Nomb Producto' },
			{ data: 'precioVenta', title: 'pVenta' },
			{ data: 'costoUnitatio', title: 'cUnitatio' },
			{ data: 'unidadesExistente', title: 'uExistente' },
			{ data: 'cantidadMinima', title: 'cantMinima' },
			{ data: 'cantidadMaxima', title: 'cantMaxima' },
			{ data: 'estado', title: 'Estado' },
			{
				title: 'Acciones',
				render: function (data, type, row) {
					return `<button class="btn btn-warning btn-sm mx-auto edit-btn">Editar</button>
							<button class="btn btn-danger btn-sm mx-auto delete-btn">Borrar</button>`;
				},
				data: null
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



	let detFactura = $('#detFactura')[0];
	$('#tbl-facturas').on('click', '.verFact-btn', function () {
		var dataRow = tblfacturas.row($(this).closest('tr')).data();
		fetchDataDetalleFactura(dataRow.codFactura);
		
		alertify.confirm('', function () { })
			.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Detalle Factura</div>')
			.resizeTo('500px', 'auto')
			.set('closable', false)
			.set('resizable', true)
			.resizeTo('80%','80%')
			.setContent(detFactura)
			.set({
				labels: { "ok": "SI", "cancel": "NO" },
				onok: function () {
					tblDetFactura.destroy();
				},
				onclose: function(){
					tblDetFactura.destroy();
				}
			})


		let tblDetFactura = $('#tbl-DetFactura').DataTable({
			data: dataDetFactura,
			columns: [
				{ data: 'cod', title: 'Cod' },
				{ data: 'codFactura', title: 'codFactura' },
				{ data: 'codProducto', title: 'codProducto' },
				{ data: 'nombreProducto', title: 'nombreProducto' },
				{ data: 'precio', title: 'precio' },
				{ data: 'cantidad', title: 'cantidad' },
				{ data: 'subtotal', title: 'subtotal' },
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
		fetchDataProducto().then(async () => {
			tblDetFactura.clear();
			await tblDetFactura.rows.add(dataDetFactura).draw();
		});

	});

	let addProducto = $('#addProducto')[0];
	// addProducto
	$('#btn-addProducto').on('click', function () {
		alertify.confirm('', function () { })
			.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Agregar Producto</div>')
			.resizeTo('500px', 'auto')
			.set('closable', false)
			.set('resizable', false)
			.setContent(addProducto)
			.set({
				labels: { "ok": "SI", "cancel": "NO" },
				onok: async function () {
					var nuevoRegistro = {
						codProducto: '0',
						nombreProducto: $('#nomProducto').val(),
						precioVenta: $('#preProducto').val(),
						costoUnitatio: $('#cosUnitario').val(),
						unidadesExistente: $('#uniExistente').val(),
						cantidadMinima: $('#canMinima').val(),
						cantidadMaxima: $('#canMaxima').val(),
						estado: 'Habilitado'
					};
					var sendProducto = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(nuevoRegistro)
					};
					try {
						// Realizar la solicitud POST usando fetch y esperar la respuesta
						var response = await fetch('http://localhost:5269/api/Producto/Guardar', sendProducto);

						if (!response.ok) {
							throw new Error('Network response was not ok');
							alertify.error('hubo un problema');
						}

						// Convertir la respuesta a JSON
						var data = await response.json();

						// Manejar la respuesta del servidor (data) aquí
						console.log(data);
						$('#addProducto')[0].reset();
						fetchDataFactura().then(async () => {
							tblfacturas.clear();
							await tblfacturas.rows.add(dataFactura).draw();
						});

						fetchDataProducto().then(async () => {
							tblProductos.clear();
							await tblProductos.rows.add(dataProducto).draw();
						});
						alertify.success('se ingreso correctamente')
					} catch (error) {
						// Manejar errores aquí
						console.error('Error:', error);
					}
				},
				oncancel: function () {
					$('#addProducto')[0].reset();
				}
			})
		//---------//
	});

	// Delegación de eventos para los botones Editar y Borrar
	$('#tbl-Productos').on('click', '.edit-btn', function () {
		// Obtén la fila correspondiente a este botón
		var dataRow = tblProductos.row($(this).closest('tr')).data();
		
		alertify.confirm('', function () { })
			.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Agregar Producto</div>')
			.resizeTo('500px', 'auto')
			.set('closable', false)
			.set('resizable', false)
			.setContent(addProducto)
			.set({
				labels: { "ok": "SI", "cancel": "NO" },
				onok: async function () {
					var cambioRegistro = {
						codProducto: $('#codProducto').val(),
						nombreProducto: $('#nomProducto').val(),
						precioVenta: $('#preProducto').val(),
						costoUnitatio: $('#cosUnitario').val(),
						unidadesExistente: $('#uniExistente').val(),
						cantidadMinima: $('#canMinima').val(),
						cantidadMaxima: $('#canMaxima').val(),
						estado: $('#estado').val()
					};
					var sendProducto = {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(cambioRegistro)
					};
					try {
						// Realizar la solicitud POST usando fetch y esperar la respuesta
						var response = await fetch(`http://localhost:5269/api/Producto/Actualizar/${dataRow.codProducto}`, sendProducto);

						if (!response.ok) {
							throw new Error('Network response was not ok');
							alertify.error('hubo un problema');
						}

						// Convertir la respuesta a JSON
						var data = await response.json();

						// Manejar la respuesta del servidor (data) aquí
						console.log(data);
						$('#addProducto')[0].reset();
						fetchDataFactura().then(async () => {
							tblfacturas.clear();
							await tblfacturas.rows.add(dataFactura).draw();
						});

						fetchDataProducto().then(async () => {
							tblProductos.clear();
							await tblProductos.rows.add(dataProducto).draw();
						});
						alertify.success('se ingreso correctamente')
					} catch (error) {
						// Manejar errores aquí
						console.error('Error:', error);
					}
				},
				oncancel: function () {
					$('#addProducto')[0].reset();
				}
			})
		$('#codProducto').val(dataRow.codProducto);
		$('#nomProducto').val(dataRow.nombreProducto);
		$('#preProducto').val(dataRow.precioVenta);
		$('#cosUnitario').val(dataRow.costoUnitatio);
		$('#uniExistente').val(dataRow.unidadesExistente);
		$('#canMinima').val(dataRow.cantidadMinima);
		$('#canMaxima').val(dataRow.cantidadMaxima);
		$('#estado').val(dataRow.estado);

		//---------//
	});

	$('#tbl-Productos').on('click', '.delete-btn', function () {
		// Obtén la fila correspondiente a este botón
		var dataRow = tblProductos.row($(this).closest('tr')).data();
		// Implementa la lógica para borrar usando los datos de 'data'
		alertify.confirm('', function () { })
			.setHeader('<div style="text-align: center; font-size: 1.2em; font-weight: bold">Agregar Producto</div>')
			.resizeTo('500px', 'auto')
			.set('closable', false)
			.set('resizable', false)
			.setContent('Desea eliminar el producto?')
			.set({
				labels: { "ok": "SI", "cancel": "NO" },
				onok: async function () {
					var EliminarRegistro = {
						codProducto: dataRow.codProducto,
						nombreProducto: dataRow.nombreProducto,
						precioVenta: dataRow.precioVenta,
						costoUnitatio: dataRow.costoUnitatio,
						unidadesExistente: dataRow.unidadesExistente,
						cantidadMinima: dataRow.cantidadMinima,
						cantidadMaxima: dataRow.cantidadMaxima,
						estado: dataRow.estado
					};
					var sendProducto = {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(EliminarRegistro)
					};
					try {
						// Realizar la solicitud POST usando fetch y esperar la respuesta
						var response = await fetch(`http://localhost:5269/api/Producto/Eliminar/${dataRow.codProducto}`, sendProducto);
						if (!response.ok) {
							throw new Error('Network response was not ok');
							alertify.error('hubo un problema');
						}
						// Convertir la respuesta a JSON
						var data = await response.json();
						// Manejar la respuesta del servidor (data) aquí
						console.log(data);
						fetchDataFactura().then(async () => {
							tblfacturas.clear();
							await tblfacturas.rows.add(dataFactura).draw();
						});
						fetchDataProducto().then(async () => {
							tblProductos.clear();
							await tblProductos.rows.add(dataProducto).draw();
						});
						alertify.success('se Elimino correctamente')
					} catch (error) {
						// Manejar errores aquí
						console.error('Error:', error);
					}
				},
				oncancel: function () {
				}
			})
		//---------//
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
			dataFactura = result.response; // Almacena los datos en la variable 'data'
			console.log('Datos de la API:', dataFactura);
		}
	} catch (error) {
		console.error('Se produjo un error al obtener los datos de la API:', error);
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
			dataProducto = result.response; // Almacena los datos en la variable 'data'
			console.log('Datos de la API:', dataProducto);
		}
	} catch (error) {
		console.error('Se produjo un error al obtener los datos de la API:', error);
	}
}

async function fetchDataDetalleFactura(id) {
	try {
		const response = await fetch(`http://localhost:5269/api/DetalleFactura/DetalleFactura?codFactura=${id}`); // Reemplaza la URL con la de la API que desees consultar.
		if (!response.ok) {
			throw new Error(`Error en la solicitud: ${response.status}`);
		}
		const result = await response.json();
		if (result.response) {
			dataDetFactura = result.response; // Almacena los datos en la variable 'data'
			;
			console.log('Datos de la API:', dataDetFactura);
		}
	} catch (error) {
		console.error('Se produjo un error al obtener los datos de la API:', error);
	}
}