const CrmProcessShortly = (type = 1) => {
    let desc = document.getElementById("txt_descripcion_caso")
    let descripcion = desc.value !== "" ? desc.value : "se agenda para tratamiento al cliente"
    const now = new Date();
    document.getElementById("txt_agenda_hora").value = `${now.getHours()}:${(now.getMinutes() - 1 < 0 ? "00" : now.getMinutes() - 1).toString().padStart(2, '0')}`
    if (type === 1) {
        // type 1 = funcion para agendar en la bandeja de agendados xd
        llenadoSelect();
        document.querySelector("#div_agendamiento").style.display = "block"
    }
    desc.value = descripcion;
    document.getElementById("bt_guardar").click();
    document.getElementById("boton_enviar_validacion").click()
}