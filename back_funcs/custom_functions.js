
const mostrarCamposCliente = (tkt) => {
    let mdlCustom = document.querySelector('#mdModal')
    let extBox = mdlCustom.querySelector('#init-ext')
    extBox.innerHTML = '';
    let extContentInner = "";
    let mainelement = document.createElement("div")
    mainelement.classList.add("col-xs-12", "col-sm-12", "col-md-12", "col-lg-12")
    let extContent = document.createElement("div")
    extContent.classList.add("ext_", "content");
    let configCRM = JSON.parse(localStorage.getItem("configCRM")).extFunction;

    extContentInner += (configCRM.agendar) ? `<div class="btn btn-warning ext_ agendados">A la bandeja</div>` : "";
    extContentInner += (configCRM.listTkt) ? `<div class="btn btn-warning ext_ ticketlist">Historial de tickets</div>` : "";
    extContentInner += (configCRM.serviceinfo) ? `<div class="btn btn-warning ext_ ontinfo">Info ONT</div>` : "";
    extContentInner += (configCRM.findgo) ? `<div class="btn btn-warning ext_ closedgo">Cerrar tkt (DGO)</div>` : "";
    extContentInner += (configCRM.finlosrojo) ? `<div class="btn btn-warning ext_ finlosrojo">Cerrar tkt (monitoreo)</div>` : "";
    extContentInner += (configCRM.sendLosRojo) ? `<div class="btn btn-warning ext_ sendlosrojo">Enviar LOS Rojo</div>` : "";
    extContentInner += (configCRM.alertcto) ? `<div class="btn btn-warning ext_ statuscto">CTO <span class="results"></span> reporte</div>` : "";
    extContentInner += (configCRM.multiupload) ? `<div class="btn btn-warning ext_ multiupload" data-statusupload="void">Presiona aqui para subir todos las imagenes</div>` : "";
    extContent.innerHTML = extContentInner
    mainelement.appendChild(extContent)

    // let cto = getHTML(tkt).then(result => {
    //     let resultado = document.querySelector('.ext_.statuscto .results')
    //     resultado.innerHTML = localStorage.getItem('pextReporting').includes(result) ? 'con' : 'sin'
    // })
    // console.log(cto)
    configCRM.alertcto ? getHTML(tkt).then(result => { document.querySelector('.ext_.statuscto .results').innerHTML = localStorage.getItem('pextReporting').includes(result) ? 'con' : 'sin' }) : '';
    configCRM.agendar ? mainelement.querySelector(".ext_.agendados").addEventListener("click", () => CrmProcessShortly()) : "";
    configCRM.sendLosRojo ? mainelement.querySelector(".ext_.sendlosrojo").addEventListener("click", () => CrmProcessShortly(2)) : "";
    configCRM.finlosrojo ? mainelement.querySelector(".ext_.finlosrojo").addEventListener("click", () => CrmProcessShortly(4)) : "";
    configCRM.listTkt ? mainelement.querySelector(".ext_.ticketlist").addEventListener("click", () => openLastTipiPopUp()) : "";
    configCRM.serviceinfo ? mainelement.querySelector(".ext_.ontinfo").addEventListener("click", () => mostrarONTinfo()) : "";
    configCRM.multiupload ? mainelement.querySelector(".ext_.multiupload").addEventListener("click", (ev) => uploadFile(ev)) : "";
    limitchar(configCRM.limitChar);
    extBox.appendChild(mainelement)
}

const InitFunction = (ticket = null) => {
    window.ajax_mostrar_cliente = mostrarCamposCliente(ticket)
    // window.ajax_mostrar_atenciones = listarRegistroXTicket();
}
const mostrarInfoCliente = () => {

}