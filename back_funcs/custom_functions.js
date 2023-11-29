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
const mostrarCamposCliente = (tkt) => {
    let mdlCustom = document.querySelector('#mdModal')
    let extBox = mdlCustom.querySelector('#init-ext')
    extBox.innerHTML = '';
    let extContentInner = "";
    let mainelement = document.createElement("div")
    mainelement.classList.add("col-xs-12", "col-sm-12", "col-md-12", "col-lg-12")
    let extContent = document.createElement("div")
    extContent.classList.add("ext_", "content");
    let cto = getHTML(tkt).then(result => {
        let resultado = document.querySelector('.ext_.statuscto .results')
        resultado.innerHTML = localStorage.getItem('pextReporting').includes(result) ? 'con' : 'sin'
    })
    console.log(cto)
    let configCRM = JSON.parse(localStorage.getItem("configCRM")).extFunction;
    extContentInner += (configCRM.agendar) ? `<div class="btn btn-warning ext_ agendados">A la bandeja</div>` : "";
    extContentInner += (configCRM.listTkt) ? `<div class="btn btn-warning ext_ ticketlist">Historial de tickets</div>` : "";
    extContentInner += (configCRM.serviceinfo) ? `<div class="btn btn-warning ext_ ontinfo">Info ONT</div>` : "";
    extContentInner += (configCRM.findgo) ? `<div class="btn btn-warning ext_ closedgo">Cerrar tkt (DGO)</div>` : "";
    extContentInner += (configCRM.alertcto) ? `<div class="btn btn-warning ext_ statuscto">CTO <span class="results"></span> reporte</div>` : "";
    extContent.innerHTML = extContentInner
    mainelement.appendChild(extContent)
    configCRM.agendar ? mainelement.querySelector(".ext_.agendados").addEventListener("click", () => CrmProcessShortly()) : "";
    configCRM.listTkt ? mainelement.querySelector(".ext_.ticketlist").addEventListener("click", () => openLastTipiPopUp()) : "";
    configCRM.serviceinfo ? mainelement.querySelector(".ext_.ontinfo").addEventListener("click", () => mostrarONTinfo()) : "";
    limitchar(configCRM.limitChar);
    extBox.appendChild(mainelement)
}

const InitFunction = (ticket = null) => {
    window.ajax_mostrar_cliente = mostrarCamposCliente(ticket)
    window.ajax_mostrar_atenciones = listarRegistroXTicket();
}
const mostrarInfoCliente = () => {

}