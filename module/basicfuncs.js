const openLastTipiPopUp = () => {
    let dni = document.getElementById("txt_dni_cliente").value
    window.open(`http://172.27.201.14/pages/ajax/atc_registro_llamada_busca_cliente_cel.php?nro_cel=&nro_doc=${dni}&txt_idarea=8&idClienteDirecTv=&txt_id_codigo_pedido=`, "historial tkt", "screenX=-1,screenY=-1,width=330,height=630,resizable=no, toolbar=false, scrollbars=no, menubar=false, status=no, directories=no")
}

const mostrarONTinfo = () => {
    let mac = document.getElementById("txt_router_mac").value
    window.open(`http://172.27.201.14/pages/ajax/ws_atc_informacion_ont.php?mac=${mac.replaceAll("-", "")}`, "Info ont", "screenX=-1,screenY=-1,width=330,height=490,resizable=no, toolbar=false, scrollbars=no, menubar=false, status=no, directories=no")
    // ajax/ws_atc_informacion_ont.php
}

