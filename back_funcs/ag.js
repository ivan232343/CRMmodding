const ValidatePath = (path) => document.location.pathname === `/pages/ajax/${path}.php` ? true : false
if (localStorage.getItem("configCRM") !== null) {
    localStorage.getItem("configCRM")
} else {
    let initalConfiguration = {
        "avatar": "http://172.27.201.14/images/user.png",
        "background": "http://172.27.201.14/images/user-img-background.jpg",
        "extFunction": {
            "agendar": true,
            "listTkt": true,
            "serviceinfo": true,
            "findgo": false,
            "limitChar": true
        }
    }
    localStorage.setItem("configCRM", JSON.stringify(initalConfiguration))
}
document.body.classList.remove("theme-red")


// let contendor = document.createElement("div");
// contendor.classList.add("contenido_extension_agendados")
// document.body.appendChild(contendor)
// contendor.addEventListener("click", () => CrmProcessShortly())
// let openLastTipi = document.createElement("div");
// openLastTipi.classList.add("abridor_tipi")
// document.body.appendChild(openLastTipi)
// openLastTipi.addEventListener("click", () => openLastTipiPopUp());



window.onload = () => {
    const configSaved = JSON.parse(localStorage.configCRM)
    document.querySelector(".image img").src = configSaved.avatar;
    let fondo = document.querySelector(".user-info");
    fondo.style.backgroundImage = `url(${configSaved.background})`;
    fondo.style.backgroundRepeat = "round";
    let letter = document.querySelector(".info-container");
    letter.childNodes.forEach(e => {
        if (e.nodeName !== "#text") {
            e.style.color = "white";
            e.style.textShadow = " 1px 0px 0px black, 0px 1px 0px black, -1px 0px 0px black, 0px -1px 0px black";
            e.style.fontWeight = "bolder";
        }
    });
    window.ajax_mostrar_cliente = mostrarCamposCliente();
    window.ajax_mostrar_atenciones = listarRegistroXTicket();
}
document.getElementById("txt_busca").addEventListener("input", e => e.target.value = e.target.value.replaceAll("AT-", ""))

if (ValidatePath("atc_registro_llamada_busca_cliente_cel")) {
    let basicStyles = document.body.style
    basicStyles.margin = "auto";
    basicStyles.fontFamily = "serif system-ui";
    basicStyles.fontSize = "1.25rem"
} else if (!ValidatePath("atc_registro_llamadas")) {
    document.querySelector("#tablaCasos tbody").addEventListener("click", (e) => InitFunction())
}
const limitchar = () => {
    let inputToLimit = document.getElementById('txt_descripcion_caso');
    let labelToMod = document.querySelector('label[for="Cod ALumno"]')
    inputToLimit.addEventListener('input', (ev) => {
        labelToMod.innerText = `Ingrese sus observaciones: caracteres ${ev.target.value.length} / 367`
        if (ev.target.value.length < 367) {
            console.log("sigue escribiendo");
        } else {
            let dividoEn = (ev.target.value.length / 367) + 1
            let saveTempDesc = inputToLimit.value.match(/.{1,367}/g)
            labelToMod.innerText = `Ingrese sus observaciones: caracteres: ${ev.target.value.length}/367 \t veces que debe ser partido: ${dividoEn.toFixed()}`

            console.log("cuidado estas al limite");
        }
    })
}