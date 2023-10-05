const CrmProcessShortly = (type = 1) => {
    let descripcion = "se agenda para tratamiento al cliente";
    if (type === 1) {
        // type 1 = funcion para agendar en la bandeja de agendados xd
        document.getElementById("cb_tipi_caso_soporte").value = "36"
        llenadoSelect();
        document.querySelector("#div_agendamiento").style.display = "block"
        document.getElementById("txt_descripcion_caso").value = descripcion;
        document.getElementById("bt_guardar").click();
        document.getElementById("boton_enviar_validacion").click()
    }
}

const llenadoSelect = (tip = ['244', 'Agendamiento'], mot = ['635', 'Se agenda llamada']) => {
    console.log(tip, mot);
    var tipo = document.getElementById("cb_tipo_tipi_cerrado");
    var motivo = document.getElementById("cb_motivo_tipi_cerrado");
    let opt1 = document.createElement("option");
    let opt2 = document.createElement("option");
    opt1.value = tip[0]; opt1.text = tip[1]; opt1.selected = true; tipo.add(opt1);
    opt2.value = mot[0]; opt2.text = mot[1]; opt2.selected = true; motivo.add(opt2);
}

const openLastTipiPopUp = () => {
    let dni = document.getElementById("txt_dni_cliente").value
    window.open(`http://172.27.201.14/pages/ajax/atc_registro_llamada_busca_cliente_cel.php?nro_cel=&nro_doc=${dni}&txt_idarea=8&idClienteDirecTv=&txt_id_codigo_pedido=`, "historial tkt", "screenX=-1,screenY=-1,width=330,height=630,resizable=no, toolbar=false, scrollbars=no, menubar=false, status=no, directories=no")
}
const mostrarONTinfo = () => {
    let mac = document.getElementById("txt_router_mac").value
    window.open(`http://172.27.201.14/pages/ajax/ws_atc_informacion_ont.php?mac=${mac.replaceAll("-", "")}`, "Info ont", "screenX=-1,screenY=-1,width=330,height=490,resizable=no, toolbar=false, scrollbars=no, menubar=false, status=no, directories=no")
    // ajax/ws_atc_informacion_ont.php
}