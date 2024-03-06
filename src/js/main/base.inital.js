const Areas = ['Residencial', 'Gamer', 'Dgo', 'Monitoreo'];
// load styles
applyStyles(baseConfig.themePicked !== "" ? styles[baseConfig.themePicked.now] : [])
//----
let validateAppendModal = ValidatePath(['index', 'atc_registro_llamadas', 'login_form']);
const f = true
if (f && ValidatePath("soporte_asesor_casos")) {
    const scriptInsert = document.createElement("script")
    scriptInsert.type = "text/javascript"
    scriptInsert.referrerPolicy = "no-referrers"
    scriptInsert.crossOrigin = ""
    scriptInsert.async = true
    scriptInsert.defer = true
    scriptInsert.innerHTML = `setInterval(() => {
        $('#tablaCasos').DataTable().ajax.reload(null, false);
    }, 1000)`
    document.body.appendChild(scriptInsert)
}
window.document.location.href.includes('172.16.66.76') ? document.body.style.filter = 'invert(1)' : '';
if (!ValidatePath('login_form')) {
    // const configSaved = JSON.parse(localStorage.configCRM)
    let a = document.querySelector(".image img");
    a.src = baseConfig.profileConfig.avatar;
    a.width = 65;
    a.height = 65;
    let fondo = document.querySelector(".user-info");
    fondo.style.backgroundImage = `url(${baseConfig.profileConfig.background})`;
    fondo.style.backgroundSize = "cover";
    fondo.style.backgroundRepeat = "no-repeat";
    fondo.style.backgroundPosition = "center";
    fondo.style.backgroundOrigin = "padding-box";
    let letter = document.querySelector(".info-container");
    letter.childNodes.forEach(e => {
        if (e.nodeName !== "#text") {
            e.style.color = "white";
            e.style.textShadow = " 1px 0px 0px black, 0px 1px 0px black, -1px 0px 0px black, 0px -1px 0px black";
            e.style.fontWeight = "bolder";
        }
    });
    document.querySelector('.sidebar .legal .copyright').innerText = `Extension desarrollada por Ivan Pulache :D, \t enjoy!`
}
document.querySelectorAll(".email")[1].innerText = `Area: AT - ${JSON.parse(localStorage.configCRM).profileConfig.area}`
if (!validateAppendModal.some(path => path)) {
    if (baseConfig.moduleConfig.base.multiupload) {
        document.forms.form_audio_adjunto.querySelector('#uploadedFile').setAttribute('multiple', 'true')
    }
    let tempCopy = document.createElement('textarea')
    document.body.appendChild(tempCopy)
    tempCopy.style.display = 'none';
    document.getElementById("txt_busca").addEventListener("input", e => e.target.value = e.target.value.replaceAll(/[a-zA-Z]+-/g, ""))
    // inicializar el div del modal 
    let mdlCustom = document.querySelector('#mdModal')
    let initDiv = document.createElement('div')
    initDiv.id = "init-ext";
    mdlCustom.appendChild(initDiv)
    document.querySelector("#tablaCasos tbody").addEventListener("click", (ev) => {
        if (ev.target.localName !== 'td') {
            let element = '';
            if (ev.target.localName !== 'button') {
                element = ev.srcElement.offsetParent.parentElement.parentElement.parentElement
            } else {
                element = ev.target.parentElement.parentElement
            }
            // console.log(element)
            let ticket = element.querySelectorAll('td')[4].innerText.replace(/[a-zA-Z-]+/g, "");
            let documento = element.querySelectorAll('td')[5].innerText.replace(/[a-zA-Z-]+/g, "");
            InitFunction(ticket, documento)

        } else {
            let text = ev.target.innerText
            tempCopy.innerHTML = text;
            tempCopy.style.display = 'block'
            tempCopy.focus();
            tempCopy.select();
            document.execCommand('copy')
            tempCopy.innerHTML = '';
            tempCopy.style.display = 'none'
            // console.log(ev, text)
        }
    })

};






// '.modal-content.modal-col-blue > form input, .modal-content.modal-col-blue > form select,.modal-content.modal-col-black > form input, .modal-content.modal-col-black > form select,.modal-content.modal-col-cyan > form input, .modal-content.modal-col-cyan > form select.modal-content.modal-col-light-blue > form input, .modal-content.modal-col-light-blue > form select,.modal-content.modal-col-teal > form input, .modal-content.modal-col-teal > form select {background-color: black!important;color: white;border-bottom-style: groove;}'