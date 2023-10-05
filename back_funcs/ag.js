if (localStorage.getItem("configCRM") !== null) {
    localStorage.getItem("configCRM")
} else {
    let savedConfiguration =
    {
        "avatar": "https://i.redd.it/g00daubl6ug41.jpg",
        "background": "https://www.wallpaperflare.com/static/450/683/735/vocaloid-hatsune-miku-hatsune-miku-wallpaper.jpg"
    }
    localStorage.setItem("configCRM", JSON.stringify(savedConfiguration))
}
document.querySelector("#tablaCasos tbody").addEventListener("click", (e) => InitFunction())
// let contendor = document.createElement("div");
// contendor.classList.add("contenido_extension_agendados")
// document.body.appendChild(contendor)
// contendor.addEventListener("click", () => CrmProcessShortly())
// let openLastTipi = document.createElement("div");
// openLastTipi.classList.add("abridor_tipi")
// document.body.appendChild(openLastTipi)
// openLastTipi.addEventListener("click", () => openLastTipiPopUp());
if (document.location.pathname === "/pages/ajax/atc_registro_llamada_busca_cliente_cel.php") {
    let basicStyles = document.body.style
    basicStyles.margin = "auto"; basicStyles.fontFamily = "serif system-ui"; basicStyles.fontSize = "1.25rem"
}
// else {
// }



window.onload = () => {
    const configSaved = JSON.parse(localStorage.configCRM)
    document.querySelector(".image img").src = configSaved.avatar;
    let fondo = document.querySelector(".user-info"); fondo.style.backgroundImage = `url(${configSaved.background})`; fondo.style.backgroundRepeat = "round";
    let letter = document.querySelector(".info-container"); letter.childNodes.forEach(e => {
        if (e.nodeName !== "#text") {
            e.style.color = "white";
            e.style.textShadow = " 1px 0px 0px black, 0px 1px 0px black, -1px 0px 0px black, 0px -1px 0px black";
            e.style.fontWeight = "bolder";
        }
    });
}
document.getElementById("txt_busca").addEventListener("input", e => e.target.value = e.target.value.replaceAll("AT-", ""))


// let rowSelected = document.querySelectorAll("#div_ajax_cliente .row.clearfix")[3]
// let mainelement = document.createElement("div")
// mainelement.classList.add("col-xs-6", "col-sm-6", "col-md-4", "col-lg-4")
// mainelement.innerHTML = `
// <div class="ext_ content">
// <div class="btn btn-warning ext_ agendados">A la bandeja</div>
// <div class="btn btn-warning ext_ ticketlist">Historial de tickets</div>
// <div class="btn btn-warning ext_ svalist">lista de SVA</div>
// </div>
// `
// rowSelected.appendChild(mainelement)
