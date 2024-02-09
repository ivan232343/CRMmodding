let tablaHiddenCasos = document.createElement('div')
tablaHiddenCasos.classList.add("_ext", "tablaHidden")
tablaHiddenCasos.style.display = "none"
tablaHiddenCasos.innerHTML =
  `
<div class="row clearfix">
				<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
				<div class="body table-responsive">
					<table id="tablaCasos" class="table-striped table-bordered" style="width:100%">
						<thead>
							<tr class="bg-blue">
								<th class="text-center">IDREG</th>
								<th class="text-center">IDCASO</th>
								<th class="text-center">ventana</th>
								<th class="text-center"></th>
								<th class="text-center">Fecha creacion</th>
								<th class="text-center">Area creacion</th>
								<th class="text-center">Asesor creacion</th>
								<th class="text-center">Ticket</th>
								<th class="text-center">Dni cliente</th>
								<th class="text-center">Telefono</th>
								<th class="text-center">Cod pedido</th>
								<th class="text-center">Cliente</th>
								<th class="text-center">Elite</th>
								<th class="text-center">Distrito</th>
								<!-- <th class='text-center'>Medio</th>
								<th class='text-center'>Tipo</th>-->
								<th class="text-center">Motivo</th>
								<th class="text-center">Estado</th>
								<th class="text-center">Gestionado</th>
							</tr>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
				</div>
			</div>
`
window._init.tbcasos = $('#tablaCasos').DataTable({
  "columnDefs":
    [//ocultar columna primera (0)
      {
        "targets": [0],
        "visible": false,
        "searchable": false
      },
      {
        "targets": [1],
        "visible": false,
        "searchable": false
      },
      {
        "targets": [2],
        "visible": false,
        "searchable": false
      }
    ],

  "searching": true,//oculta el filtro de busqueda
  "lengthChange": true,//oculta la cantidad de filas a mostrar
  pageLength: 10,
  destroy: true,
  order: [[0, "asc"]],
  dom: 'Bfrtip',//Blfrtip
  responsive: true,
  buttons:
    [
      'copy',// 'csv',  //, 'pdf', 'print'
      {
        extend: 'excel',
        title: 'Resumen tickets pendientes AT(8)',
        className: 'btn-success',
        exportOptions: {
          columns: [0, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        }
      }
    ],
  language:
  {
    "emptyTable": "No hay datos disponibles en la tabla.",
    "info": " Del _START_ al _END_ de _TOTAL_ ",
    "infoEmpty": "Mostrando 0 registros de un total de 0.",
    "infoFiltered": "(filtrados de un total de _MAX_ registros)",
    "infoPostFix": "(actualizados)",
    "lengthMenu": "Mostrar _MENU_ registros",
    "loadingRecords": "Cargando...",
    "processing": "Procesando...",
    "search": "Buscar:",
    "searchPlaceholder": "Dato para buscar",
    "zeroRecords": "No se han encontrado coincidencias.",
    paginate:
    {
      "first": "Primera",
      "last": "Última",
      "next": "Siguiente",
      "previous": "Anterior"
    }
  },

  "ajax": {
    "url": "ajax/soporte_asesor_casos_lista.php",
    'data': { "id_empresa": id_empresa, "dni_usuario": dni_usuario, "id_subarea": id_subarea, "buscador": buscador, "estado": estado, "cb_busca_columna": cb_busca_columna, "ventana": 2, "cb_cliente_elite": cb_cliente_elite },
    'type': 'post',
    "dataSrc": ""
  },
  "columns":
    [
      { "data": "id_reg", className: "text-left" },
      { "data": "id_caso", className: "text-left" },
      { "data": "ventana", className: "text-left" },
      { 'defaultContent': "<button class='btn bg-indigo waves-effect'> <i class='material-icons'><span class='glyphicon glyphicon-search'></span></i></button>" },
      { "data": "fecha_creacion", className: "text-center" },
      { "data": "area_creacion", className: "text-left" },
      { "data": "creado_por", className: "text-left" },
      { "data": "ticket", className: "text-center" },
      { "data": "dni_contacto", className: "text-center" },
      { "data": "telefono", className: "text-center" },
      { "data": "cod_pedido", className: "text-center" },
      { "data": "nombre_contacto", className: "text-left" },
      { "data": "elite", className: "text-center" },
      { "data": "Distrito", className: "text-center" },
      { "data": "motivo", className: "text-center" },
      { "data": "estado", className: "text-center" },
      { "data": "sin_gestion", className: "text-center" }
    ]
});