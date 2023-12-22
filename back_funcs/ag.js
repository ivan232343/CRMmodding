
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
            element = element.querySelectorAll('td')[4].innerText.replace(/[a-zA-Z-]+/g, "")
            InitFunction(element)

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
// ----------

document.querySelectorAll(".dropdown-menu").forEach((e) => e.addEventListener('click', (ev) => ev.stopPropagation()))
const limitchar = (turn) => {
    let labelToMod = document.querySelector('label[for="Cod ALumno"]')
    if (turn) {
        let inputToLimit = document.getElementById('txt_descripcion_caso');
        inputToLimit.addEventListener('input', (ev) => {
            labelToMod.innerText = `Ingrese sus observaciones: caracteres ${ev.target.value.length} / 367`
            if (ev.target.value.length < 367) {
                // console.log("sigue escribiendo");
            } else {
                let dividoEn = (ev.target.value.length / 367) + 1
                let saveTempDesc = inputToLimit.value.match(/.{1,367}/g)
                labelToMod.innerText = `Ingrese sus observaciones: caracteres: ${ev.target.value.length}/367 \t veces que debe ser partido: ${dividoEn.toFixed()}`

                // console.log("cuidado estas al limite");
                // console.log(saveTempDesc);
            }
        })
    } else {
        labelToMod.innerText = 'Ingrese sus observaciones: ';
    }
}
const copyTextTable = () => {
    document.querySelectorAll('.text-center').forEach((e) => {
        e.addEventListener('click', (ev) => {
            // console.log(ev.target.textContent.split(' ').join('\t'))
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
        countdown(onMemory, (d, t) => {
            if (t === undefined) {
                console.log(d, e)
                localStorage.setItem('StatusGetterPEXT', JSON.stringify({ 'inCooldown': true, 'left': d.remainMinutes, 'nextTo': deadline }))
            } else {
                localStorage.setItem('StatusGetterPEXT', JSON.stringify({ 'InProgress': false, 'left': 0 }))
                clearInterval(t)
            }
            // Falta ${d.remainDays} dias, ${d.remainHours} horas, ${d.remainMinutes} minutos, ${d.remainSeconds} 
        })
    }
    // else { console.log('no esta') }
}
document.querySelector('.sidebar .legal .copyright').innerText = `Extension desarrollada por Ivan Pulache :D, \t enjoy!`


async function uploadFile(entity) {
    console.log(entity)
    const midata = new FormData();
    const formArea = document.forms.form_audio_adjunto;
    let dniAsesor = document.getElementById('txt_dni_asesor').value;
    let dniCliente = document.getElementById('txt_dni_cliente').value;
    let idContrato = document.getElementById('txt_id_reg').value;
    let fuente = 'AT';
    let txt_id_area_sub_det3 = document.getElementById('txt_id_area_sub_det').value;
    let opcion1 = '';
    let opcion2 = '';
    let opcion3 = '';
    let toUpload = formArea.uploadedFile.files;
    midata.append('dni_asesor', dniAsesor);
    midata.append('dni_cliente', dniCliente);
    midata.append('id_venta', idContrato);
    midata.append('origen', fuente);
    midata.append('txt_id_area_sub_det', txt_id_area_sub_det3);
    midata.append('opcion1', opcion1);
    midata.append('opcion2', opcion2);
    midata.append('opcion3', opcion3);
    for (let i = 0; i < toUpload.length; i++) {
        midata.append('uploadedFile', toUpload[i]);
        await fetch('ajax/adjuntos-subir.php', {
            method: "POST",
            body: midata,
            RequestCache: false,
        })
            .then(res => res)
            .catch(error => console.error('Error:', error))
            .then(res => console.log('success: ', res));
    }
    formArea.reset();
    await fetch(`ajax/adjuntos-mostrar.php?id_contrato=${idContrato}&color=bg-blue&opcion1=0&opcion2=0`)
        .then(res => res.text())
        .then(response => document.getElementById("div_ajax_tabla_file_subidos").innerHTML = response);
}

