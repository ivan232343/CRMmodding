// function ajax_mostrar_atenciones() {
//     let id_reg = document.getElementById("txt_id_reg").value
//     let id_caso = document.getElementById("txt_id_caso").value
//     var parametros = `?id_reg=${id_reg}&id_caso=${id_caso}`;
//     const xhr = new XMLHttpRequest()
//     xhr.open("POST", "ajax/soporte_masivos_supervisor_muestra_llamadas.php");
//     xhr.setRequestHeader("Charset", "UTF-8");
//     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//     xhr.send(parametros);
//     xhr.getResponseHeader("Content-type", "text/html");
//     xhr.onreadystatechange = (e) => {
//         if (xhr.readyState === 4) {
//             document.getElementById("div_ajax_atenciones").innerHTML = e.responseText
//             document.querySelectorAll(".bg-indigo").forEach(
//                 (e) => {
//                     e.classList.remove("bg-indigo")
//                     e.classList.add("bg-custom")
//                 }
//             )
//         }
//     }
//     // $.ajax({
//     // 	url:'ajax/soporte_masivos_supervisor_muestra_llamadas.php',
//     // 	data: parametros,
//     // 	 beforeSend: function(objeto){
//     //   },
//     // 	success:function(data){
//     // 		$("#div_ajax_atenciones").html(data).fadeIn('slow');
//     // 	}
//     // })
// }