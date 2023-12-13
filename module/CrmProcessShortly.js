const CrmProcessShortly = (type = 1) => {
    let desc = document.getElementById("txt_descripcion_caso")
    let descripcion = ''
    let now = new Date();
    document.getElementById("txt_agenda_hora").value = `${now.getHours().toString().padStart(2, '0')}:${now.getUTCMinutes().toString().padStart(2, '0')}`
    if (type === 1) {
        // type 1 = funcion para agendar en la bandeja de agendados xd
        descripcion = desc.value !== "" ? desc.value : "se agenda para tratamiento al cliente";
        llenadoSelect();
        document.querySelector("#div_agendamiento").style.display = "block";
    } else if (type === 2) {
        // envio visita por los rojo
        descripcion = desc.value !== "" ? desc.value : "se envia vt por LOS ROJO"
        llenadoSelect(34, ['207', 'Visita tecnica Externa'], ['1707', 'Los rojo'])
        document.querySelector("#div_agendamiento").style.display = 'none'
    } else if (type === 3) {
        // envio visita por masivo pext
        let descTemp = desc.value
        descripcion = `${desc.value !== "" ? descTemp : "se valida masivo"}`
        llenadoSelect(34, ['207', 'Visita tecnica Externa'], ['1707', 'Los rojo'])
        document.querySelector("#div_agendamiento").style.display = 'none'
    }
    desc.value = descripcion;
    if (document.getElementById("bt_guardar") !== null) {
        document.getElementById("bt_guardar").click();
    } else {
        document.getElementById("bt_save_asesor_caso").click()
    }
    // document.querySelector('.sa-button-container .confirm').click()
}

