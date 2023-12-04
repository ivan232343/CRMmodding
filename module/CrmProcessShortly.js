const CrmProcessShortly = (type = 1) => {
    let desc = document.getElementById("txt_descripcion_caso")
    let descripcion = ''
    const now = new Date();
    document.getElementById("txt_agenda_hora").value = `${now.getHours()}:${(now.getMinutes() - 1 < 0 ? "00" : now.getMinutes() - 1).toString().padStart(2, '0')}`
    if (type === 1) {
        // type 1 = funcion para agendar en la bandeja de agendados xd
        descripcion = desc.value !== "" ? desc.value : "se agenda para tratamiento al cliente"
        llenadoSelect();
        document.querySelector("#div_agendamiento").style.display = "block"
    } else if (type === 2) {
        descripcion = desc.value !== "" ? desc.value : "se envia vt por LOS ROJO"
        llenadoSelect(34, ['207', 'Visita tecnica Externa'], ['1707', 'Los rojo'])
        document.querySelector("#div_agendamiento").style.display = 'none'
    }
    desc.value = descripcion;
    // document.getElementById("bt_guardar").click();
    document.getElementById("bt_save_asesor_caso").click()
    document.getElementById("bt_save_asesor_caso").addEventListener('click', (e) => {
        console.log(e)
    })
    document.querySelector('.sa-button-container .confirm').click()
}