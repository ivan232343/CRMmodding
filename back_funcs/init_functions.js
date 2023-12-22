const ValidatePath = (path, subdir = false, args) => {
    if (typeof path === 'string') {
        return document.location.pathname === `/pages/${subdir !== false ? 'ajax/' : ''}${path}.php` ? true : false
    } else {
        let booleanArray = []
        for (let i = 0; i < path.length; i++) {
            document.location.pathname === `/pages/${subdir !== false ? 'ajax/' : ''}${path[i]}.php` ? booleanArray.push(true) : booleanArray.push(false)
        }
        return booleanArray
    }
}
let validateAppendModal = ValidatePath(['index', 'atc_registro_llamadas'])
function getUriFetch(windows) {
    const buildUri = (windows === 2 || windows === 7 || windows === 12) ? "asesor_casos_lista" : (windows === 5) ? 'asesor_agendados_lista2' : (windows === 3) ? 'visitas_lista_casos2_lista' : 'no_data'
    return buildUri;
}

const countdown = (deadline, callback) => {
    const timerUpdate = setInterval(() => {
        let t = getRemainingTime(deadline);
        //          localStorage.setItem('StatusGetterPEXT', JSON.stringify({ 'inCooldown': true, 'left': t.remainMinutes, 'nextTo': deadline }))
        // console.log(`falta ${t.remainDays}d:${t.remainHours}h:${t.remainMinutes}m:${t.remainSeconds}s para navidad`);
        if (t.remainTime <= 0) {
            return callback(t, timerUpdate);
            //             localStorage.setItem('StatusGetterPEXT', JSON.stringify({ 'InProgress': false, 'left': 0 }))
            // el.innerHTML = finalMessage;
        } else {
            return callback(t);
        }
    }, 1000)
};
const getRemainingTime = deadline => {
    let now = new Date(),
        remainTime = (new Date(deadline) - now + 1000) / 1000,
        remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
        remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
        remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
        remainDays = Math.floor(remainTime / (3600 * 24));

    return { remainSeconds, remainMinutes, remainHours, remainDays, remainTime }
};
countdown('Mon Dec 18 2023 19:38:00 GMT-0500 (hora estándar de Perú)', (d, e) => {
    if (e === undefined) {
        console.log(d, e)
    } else {
        clearInterval(e)
    }
})

// // navidad
// let niu = document.createElement('ul')
// niu.classList.add('nav', 'navbar-nav', 'navbar-right')
// document.querySelector("#navbar-collapse").appendChild(niu).innerHTML = `
// <ul class="nav navbar-nav navbar-right">
//     <p class="_ext navidad"></p>
// </ul>
// `
// countdown('Mon Dec 25 2023 00:00:00 GMT-0500 (hora estándar de Perú)', (d, e) => {
//     if (e === undefined) {
//         document.querySelector('.navidad-cñores').innerHTML = `Falta ${d.remainDays} dias, ${d.remainHours} horas, ${d.remainMinutes} minutos, ${d.remainSeconds} segundos para navidad`
//     } else {
//         clearInterval(e)
//     }
// })