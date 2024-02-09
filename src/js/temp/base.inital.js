let validateAppendModal = ValidatePath(['index', 'atc_registro_llamadas', 'login_form'])
if (window.document.location.href.includes('172.16.66.76')) {
    document.body.style.filter = 'invert(1)'
}
if (!ValidatePath('login_form')) {
    const configSaved = JSON.parse(localStorage.configCRM)
    document.querySelector(".image img").src = configSaved.avatar;
    let fondo = document.querySelector(".user-info");
    fondo.style.backgroundImage = `url(${configSaved.background})`;
    fondo.style.backgroundSize = "cover";
    fondo.style.backgroundRepeat = "no-repeat";
    fondo.style.backgroundPosition = "center";
    fondo.style.backgroundOrigin = "content-box";
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

if (!validateAppendModal.some(path => path)) {
    document.forms.form_audio_adjunto.querySelector('#uploadedFile').setAttribute('multiple', 'true')
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

document.querySelectorAll(".dropdown-menu").forEach((e) => e.addEventListener('click', (ev) => ev.stopPropagation()))
