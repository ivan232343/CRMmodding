

const CrmProcessShortly = (type = 1) => {
    if (type === 1) {
        // type 1 = funcion para agendar en la bandeja de agendados xd
        document.getElementById("cb_tipi_caso_soporte").value = "36"
        document.querySelector("#div_agendamiento").style.display = "block"
        llenadoSelect();
        document.getElementById("txt_descripcion_caso").value = "se agenda para su pronto tratamiento";
        document.getElementById("bt_guardar").click();
        // document.getElementById("boton_enviar_validacion").click()
    }
}

const llenadoSelect = (tip = ['244', 'Agendamiento'], mot = ['635', 'Se agenda llamada']) => {
    var tipo = document.getElementById("cb_tipo_tipi_cerrado");
    var motivo = document.getElementById("cb_motivo_tipi_cerrado");
    let opt1 = document.createElement("option");
    let opt2 = document.createElement("option");
    opt1.value = tip[0]; opt1.text = tip[1]; opt1.selected = true; tipo.add(opt1);
    opt2.value = mot[0]; opt2.text = mot[1]; opt2.selected = true; motivo.add(opt2);
}