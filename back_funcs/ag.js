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
            "limitChar": true,
            "alertcto": true
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

    if (window.location.pathname === '/pages/soporte_asesor_casos.php') {
        // const getterCTO = setInterval(() => {
        //     getDataTable(12).then((d) => { console.log(d) })
        // }, 100)
        // getterCTO()
    }
    // inicializar el div del modal 
    let mdlCustom = document.querySelector('#mdModal')
    let initDiv = document.createElement('div')
    initDiv.id = "init-ext";
    mdlCustom.appendChild(initDiv)
    // ----------
    const configSaved = JSON.parse(localStorage.configCRM)
    document.querySelector(".image img").src = configSaved.avatar;
    let fondo = document.querySelector(".user-info");
    fondo.style.backgroundImage = `url(${configSaved.background})`;
    fondo.style.backgroundSize = "cover";
    fondo.style.backgroundRepeat = "no-repeat";
    let letter = document.querySelector(".info-container");
    letter.childNodes.forEach(e => {
        if (e.nodeName !== "#text") {
            e.style.color = "white";
            e.style.textShadow = " 1px 0px 0px black, 0px 1px 0px black, -1px 0px 0px black, 0px -1px 0px black";
            e.style.fontWeight = "bolder";
        }
    });
    // window.ajax_mostrar_cliente = mostrarCamposCliente();
    // window.ajax_mostrar_atenciones = listarRegistroXTicket();
    document.querySelectorAll(".dropdown-menu").forEach((e) => {
        e.addEventListener('click', (ev) => {
            ev.stopPropagation();
        })
    })
}
document.getElementById("txt_busca").addEventListener("input", e => e.target.value = e.target.value.replaceAll(/[a-zA-Z]+-/g, ""))
// document.getElementById("txt_date_visita").removeAttribute("max")

if (ValidatePath("atc_registro_llamada_busca_cliente_cel")) {
    let basicStyles = document.body.style
    basicStyles.margin = "auto";
    basicStyles.fontFamily = "serif system-ui";
    basicStyles.fontSize = "1.25rem"
} else if (!ValidatePath("atc_registro_llamadas")) {
    document.querySelector("#tablaCasos tbody").addEventListener("click", (ev) => {
        if (ev.target.localName !== 'td') {
            let element = '';
            if (ev.target.localName !== 'button') {
                element = ev.srcElement.offsetParent.parentElement.parentElement.parentElement
            } else {
                element = ev.target.parentElement.parentElement
            }
            element = element.querySelectorAll('td')[4].innerText.replace(/[a-zA-Z]+-/g, "")
            InitFunction(element)

        }
    })
};
const limitchar = (turn) => {
    let labelToMod = document.querySelector('label[for="Cod ALumno"]')
    if (turn) {
        let inputToLimit = document.getElementById('txt_descripcion_caso');
        inputToLimit.addEventListener('input', (ev) => {
            labelToMod.innerText = `Ingrese sus observaciones: caracteres ${ev.target.value.length} / 367`
            if (ev.target.value.length < 367) {
                console.log("sigue escribiendo");
            } else {
                let dividoEn = (ev.target.value.length / 367) + 1
                let saveTempDesc = inputToLimit.value.match(/.{1,367}/g)
                labelToMod.innerText = `Ingrese sus observaciones: caracteres: ${ev.target.value.length}/367 \t veces que debe ser partido: ${dividoEn.toFixed()}`

                console.log("cuidado estas al limite");
                console.log(saveTempDesc);
            }
        })
    } else {
        labelToMod.innerText = 'Ingrese sus observaciones: ';
    }
}
const copyTextTable = () => {
    document.querySelectorAll('.text-center').forEach((e) => {
        e.addEventListener('click', (ev) => {
            console.log(ev.target.textContent.split(' ').join('\t'))
            var content = document.getElementById('txt_descripcion_caso');
            content.innerHTML = ev.target.textContent.split(' ').join('\t');
            content.focus();
            content.select();
            document.execCommand('copy')
            content.innerHTML = '';
        })
    })
}
if (localStorage.getItem('StatusGetterPEXT') === null) {
    localStorage.setItem('StatusGetterPEXT', JSON.stringify({ 'InProgress': false, 'inCooldown': false, 'left': 0 }))
} else {
    let getter = JSON.parse(localStorage.getItem('StatusGetterPEXT'))
    if (getter.nextTo) {
        let onMemory = new Date(getter.nextTo)
        countdown(onMemory)
    }
    else { console.log('no esta') }
}
