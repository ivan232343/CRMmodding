const countdown = (deadline) => {
    const timerUpdate = setInterval(() => {
        let t = getRemainingTime(deadline);
        localStorage.setItem('StatusGetterPEXT', JSON.stringify({ 'inCooldown': true, 'left': t.remainMinutes, 'nextTo': deadline }))
        // el.innerHTML = `${t.remainDays}d:${t.remainHours}h:${t.remainMinutes}m:${t.remainSeconds}s`;

        if (t.remainTime <= 1) {
            clearInterval(timerUpdate);
            localStorage.setItem('StatusGetterPEXT', JSON.stringify({ 'InProgress': false, 'left': 0 }))
            // el.innerHTML = finalMessage;
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
const dataWindowLink = [{ ventana: 5, link: "agendados" }, { ventana: 2, link: "asesor_casos" }, { ventana: 3, link: "visitas_lista_casos" }, { ventana: 3, link: "visitas_lista_casos_provincias" }, { ventana: 7, link: "garantia_supervisor" }, { ventana: 12, link: "plantaext" }]
let niu = document.createElement('ul')
niu.classList.add('nav', 'navbar-nav', 'navbar-right')
document.querySelector("#navbar-collapse").appendChild(niu).innerHTML = `
<li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown" style="margin-top:8px;" role="button"
        aria-expanded="true">
        <i class="material-icons">playlist_play</i>
        <span class="label-count"><span class="count"></span></span>
    </a>
    <ul class="dropdown-menu">
        <div class="main_box">
            <li class="header"> Listado de CTO </li>
            <li class="body">
                <div class="context_menu">
                    <div class="extension content _getcto">
                        <div class="advertencias">
                            <p>Aqui podras obtener los CTO dependiendo el motivo</p>
                            <span>Advertencia: Dependiendo de la cantidad de tickets, puede que tarde la consulta. Ten paciencia!</span>
                        </div>
                        <div >
                                <div class="item">
                                    <label for="s_data_to">
                                        Seleccione motivo
                                    </label>
                                        <select name="s_data_to" id="s_data_to">
                                            <option value="LOS ROJO">LOS ROJO</option>
                                            <option value="Ancho De Banda">Ancho De Banda</option>
                                            <option value="Lentitud">Lentitud</option>
                                            <option value="Intermitencia">Intermitencia</option>
                                            <option value="Perdida Total">Perdida Total</option>
                                        </select>
                                </div>
                                <div class="item">
                                    <button class="btn btn-success" id="btn_get_cto_data">Traer Resultados</button>
                                </div>
                        </div>
                        <div class="resultado">

                        </div>
                    </div>
                </div>
            </li>
            <li class="footer">
            <div class="context _persist_">
            <div class="box-title">
            <p>Conteo de tickets pendientes</p>
            </div>
                <div class="box-data">
            
                    </div>
                </div>
            </li>
        </div>
    </ul>
</li>
`;
function loader(element, text, float = false) {
    const div = document.querySelector(element);
    div.innerHTML = `<div class="_ext loading"><div class="preloader pl-size-xs">
    <div class="spinner-layer pl-deep-purple">
        <div class="circle-clipper left">
            <div class="circle"></div>
        </div>
        <div class="circle-clipper right">
            <div class="circle"></div>
        </div>
    </div>
</div> <p>${text}...</p></div>`;
}
async function getHTML(idReg) {
    let response = await fetch(`ajax/soporte_visita_mostrarinfo.php?cod_id_reg=${idReg}`);
    let html = await response.text();
    let parse = new DOMParser();
    let doc = parse.parseFromString(html, 'text/html');
    let cto = doc.getElementById('txt_cto').value;
    return cto;
}
function getUriFetch(windows) {
    const buildUri = (windows === 2 || windows === 7 || windows === 12) ? "asesor_casos_lista" : (windows === 5) ? 'asesor_agendados_lista2' : (windows === 3) ? 'visitas_lista_casos2_lista' : 'no_data'
    return buildUri;
}
async function getDataTable(ventana = null, mainMotivo = null, idSubArea = null) {
    let buscador = ''; let dniUser = ''; let estado = 1; let idCargo = ''; let ubigeo = ''
    let idEmpresa = 1;
    let cbSearchCol = 0;
    let cbClienteElite = 3;
    dniUser = document.querySelector("#txt_dni_usuario").value;
    if (ventana === null) {
        const div = document.querySelector('.extension.content._getcto .resultado');
        for (const prop in dataWindowLink) {
            if (window.location.pathname.includes(dataWindowLink[prop].link))
                ventana = dataWindowLink[prop].ventana
        }
        buscador = "";
        idSubArea = document.querySelector("#txt_id_subarea").value;
        estado = document.querySelector("#busca_estado").value;
        idCargo = document.querySelector('#txt_id_cargo') !== null ? document.querySelector('#txt_id_cargo').value : "";
        ubigeo = ventana !== 3 ? '' : !window.location.pathname.includes('provincias') ? "00150100" : '';
    }
    // console.log(ventana, mainMotivo, getUriFetch(ventana), ventana.toString())
    try {
        let url = `ajax/soporte_${getUriFetch(ventana)}.php?id_empresa=${idEmpresa}&dni_usuario=${dniUser}&id_subarea=${idSubArea}&buscador=${buscador}&estado=${estado}&cb_busca_columna=${cbSearchCol}&ventana=${ventana.toString()}&cb_cliente_elite=${cbClienteElite}&id_cargo=${idCargo}&ubigeo=${ubigeo}`
        const response = await fetch(url);
        const data = await response.json();
        const count = {};
        for (const obj of data) {
            const motivo = obj.motivo;
            (count[motivo]) ? count[motivo]++ : count[motivo] = 1
        }
        let tempmotivo = [];
        data.forEach(temp => {
            temp.motivo === mainMotivo ? tempmotivo.push(temp) : '';
        })
        return { "data": data, "counteo": count, "orderby": tempmotivo };
    } catch (error) {
        console.error(error);
    }
}
getDataTable()
    .then(reponse => {
        loader('.extension.content._getcto .resultado', 'cargando contenido')
        console.log(reponse)
        const div = document.querySelector('.extension.content._getcto .resultado');
        const divInterno = document.querySelector('.box-data')
        div.innerHTML = '';
        divInterno.innerHTML = ''
        if (reponse.counteo !== null) {
            for (const motivo in reponse.counteo) {
                const item = document.createElement('div');
                const dataElement = document.createElement('p');
                const value = reponse.counteo[motivo];
                dataElement.textContent = `${motivo}: ${value}`;
                item.appendChild(dataElement);
                divInterno.appendChild(item);
            }
        } else {
            div.innerHTML = `<div class="_ext loading"><i class="material-icons">cloud_off</i>
            <p>No se valida tickets pendientes</p></div>`;
        }
    })
document.querySelector("#btn_get_cto_data").addEventListener("click", (e) => {
    e.preventDefault();
    // http://172.27.201.14/pages/ajax/soporte_asesor_casos_lista.php?id_empresa=1&dni_usuario=72510503&id_subarea=8&buscador=&estado=1&cb_busca_columna=0&ventana=2&cb_cliente_elite=3
    // let uwu = getDataTable()
    // const getdataTemp = [];
    const motivo = document.querySelector("#s_data_to").value
    const promises = [];
    loader('.extension.content._getcto .resultado', 'cargando contenido')

    getDataTable().then(data => {
        data.data.forEach((e) => e.motivo === motivo ? promises.push(getHTML(e.id_reg)) : "");
        Promise.all(promises)
            .then(results => {
                const div = document.querySelector('.extension.content._getcto .resultado');
                div.innerHTML = 'Acomodando los datos, un momento mas...';
                console.log(results)
                if (results.length > 0) {
                    results = results.reduce((acc, curr) => {
                        if (curr in acc) {
                            acc[curr]++;
                        } else {
                            acc[curr] = 1;
                        }
                        return acc;
                    }, {});
                    const keys = Object.keys(results);
                    div.innerHTML = "";
                    keys.forEach((key) => {
                        const item = document.createElement('div');
                        const dataElement = document.createElement('p');
                        const value = results[key];
                        dataElement.textContent = `${key}: ${value}`;
                        item.appendChild(dataElement);
                        div.appendChild(item);
                    });
                } else {
                    div.innerHTML = '<div class="_ext loading"><i class="material-icons">cloud_off</i> <p>No se encontraron datos</p></div>';
                }
                const divInterno = document.querySelector('.box-data')
                divInterno.innerHTML = ''
                if (data.counteo !== null) {
                    for (const motivo in data.counteo) {
                        const item = document.createElement('div');
                        const dataElement = document.createElement('p');
                        const value = data.counteo[motivo];
                        dataElement.textContent = `${motivo}: ${value}`;
                        item.appendChild(dataElement);
                        divInterno.appendChild(item);
                    }
                } else {
                    divInterno.innerHTML = '<div class="_ext loading"><i class="material-icons">cloud_off</i> <p>No se valida tickets pendientes</p></div>';
                }
            })
            .catch(error => {
                console.log(error)
            })
    })
})
function longPoll() {
    let uwu = JSON.parse(localStorage.StatusGetterPEXT)
    if (uwu.inCooldown) {
        console.log('ya esta en progreso en otra pestaña o ya se ejecuto recientemente')
    } else {
        getDataTable(12, 'LOS ROJO', 51)
            .then(response => {
                const fecha = new Date();
                fecha.setMinutes(fecha.getMinutes() + 5);
                let temp = countdown(fecha, true)
                // localStorage.setItem('StatusGetterPEXT', JSON.stringify({ 'InProgress': true, 'inCooldown': false }))
                promises = [];
                response.orderby.forEach((e) => promises.push(getHTML(e.id_reg)));
                Promise.all(promises)
                    .then(results => {
                        console.log(results)
                        if (results.length > 0) {
                            // results = results.reduce((acc, curr) => {
                            //     if (curr in acc) {
                            //         acc[curr]++;
                            //     } else {
                            //         acc[curr] = 1;
                            //     }
                            //     return acc;
                            // }, {});
                            let unique = [... new Set(results)]

                            localStorage.setItem('pextReporting', JSON.stringify(unique))
                        }
                    })
                // setInterval(longPoll, 250000);
            })
            .catch(error => {
                // Manejar errores de red
                console.error(error);

                // Esperar 5 segundos antes de realizar otra solicitud
                // setInterval(longPoll, 250000);
            });
    }
    // setTimeout(longPoll, 40000);
}

if (!window.location.pathname.includes("soporte_plantaext")) {
    // Iniciar la solicitud de Long Polling

    if (JSON.parse(localStorage.getItem('configCRM')).extFunction.syncPext) {
        setInterval(longPoll, 2500)
    }

}