
const listarRegistroXTicket = () => {
    let id_reg = document.getElementById("txt_id_reg").value
    let id_caso = document.getElementById("txt_id_caso").value
    var parametros = `id_reg=${id_reg}&id_caso=${id_caso}`;
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "ajax/soporte_masivos_supervisor_muestra_llamadas.php?");
    xhr.setRequestHeader("Charset", "UTF-8");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(parametros);
    xhr.getResponseHeader("Content-type", "text/html");
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === 4) {
            document.getElementById("div_ajax_atenciones").innerHTML = e.target.response
            document.querySelectorAll(".bg-indigo").forEach(
                (e) => {
                    e.classList.remove("bg-indigo")
                    e.classList.add("bg-custom")
                }
            )
        }
    }
}
const mostrarCamposCliente = () => {
    let id_reg = document.getElementById("txt_id_reg").value
    var parametros = `cod_id_reg=${id_reg}`;
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "ajax/soporte_visita_mostrarinfo.php?");
    xhr.setRequestHeader("Charset", "UTF-8");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(parametros);
    xhr.getResponseHeader("Content-type", "text/html");
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === 4) {
            console.log(e.target)
            document.getElementById("div_ajax_cliente").innerHTML = e.target.response
            let rowSelected = document.querySelectorAll("#div_ajax_cliente .row.clearfix")[3]
            let mainelement = document.createElement("div")
            mainelement.classList.add("col-xs-6", "col-sm-6", "col-md-4", "col-lg-4")
            mainelement.innerHTML = `
            <div class="ext_ content">
            <div class="btn btn-warning ext_ agendados">A la bandeja</div>
            <div class="btn btn-warning ext_ ticketlist">Historial de tickets</div>
            <div class="btn btn-warning ext_ ontinfo">Info ONT</div>
            </div>
            `
            rowSelected.appendChild(mainelement)
            document.querySelector(".ext_.agendados").addEventListener("click", () => CrmProcessShortly());
            document.querySelector(".ext_.ticketlist").addEventListener("click", () => openLastTipiPopUp());
            document.querySelector(".ext_.ontinfo").addEventListener("click", () => mostrarONTinfo());
        }
    }
}
const InitFunction = () => {
    window.ajax_mostrar_cliente = mostrarCamposCliente();
    window.ajax_mostrar_atenciones = listarRegistroXTicket();
}