
if (localStorage.getItem("configCRM") !== null) {
    localStorage.getItem("configCRM")
} else {
    let initalConfiguration = {
        "avatar": "images/user.png",
        "background": "images/user-img-background.jpg",
        "extFunction": {
            "agendar": true,
            "findgo": false,
            "listTkt": true,
            "serviceinfo": false,
            "limitChar": false,
            "alertcto": false,
            "sendLosRojo": false,
            "syncPext": false,
            "finlosrojo": false,
            "multiupload": true,
            "prueba": true
        }
    }


    localStorage.setItem("configCRM", JSON.stringify(initalConfiguration))
}
// ui_settings('settings').then(r => console.log(r.body))

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



