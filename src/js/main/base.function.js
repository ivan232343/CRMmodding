/***********************************
* --------------------------------- *
* ----- indice de funciones ------- *
* --------------------------------- *
* --  ValidatePath               -- *
* --  InitFunction               -- *
* --  mostrarCamposCliente       -- *
* --  getUriFetch                -- *
* --  countdown                  -- *
* --  getRemainin2gTime          -- *
* --  (async) fastLogin **       -- *
* --  llenadoSelect              -- *
* --  CrmProcessShortly          -- *
* --  limitchar                  -- *
* --  (async) __getHistoryTicket -- *
* --  (async) uploadFile         -- *
* --  (async) getHTML            -- *
* --  (async) getDataTable       -- *
* --  openLastTipiPopUp          -- *
* --  mostrarONTinfo             -- *
* --  longPoll                   -- *
* --  SaveSettingCrm             -- *
* --  copyTextTable              -- *
* --------------------------------- *
************************************/

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
};
const InitFunction = (ticket = null, dni = null) => {
    window.ajax_mostrar_cliente = mostrarCamposCliente(ticket, dni)
    // window.ajax_mostrar_atenciones = listarRegistroXTicket();
};
const mostrarCamposCliente = (tkt, dni) => {
    let mdlCustom = document.querySelector('#mdModal')
    let extBox = mdlCustom.querySelector('#init-ext')
    extBox.innerHTML = '';
    let extContentInner = "";
    let mainelement = document.createElement("div")
    mainelement.classList.add("col-xs-12", "col-sm-12", "col-md-12", "col-lg-12")
    let extContent = document.createElement("div")
    extContent.classList.add("ext_", "content");
    const thrownew = JSON.parse(window.localStorage.configCRM);
    let configCRM = { base: thrownew.moduleConfig.base, monitoreo: thrownew.moduleConfig.monitoreo, dgo: thrownew.moduleConfig.dgo };
    console.log(configCRM)
    extContentInner += (configCRM.base.agendar) ? `<div class="btn btn-warning ext_ agendados">A la bandeja</div>` : "";
    extContentInner += (configCRM.base.listTkt) ? `<div class="btn btn-warning ext_ ticketlist">Historico de llamadas</div>` : "";
    extContentInner += (configCRM.base.serviceinfo) ? `<div class="btn btn-warning ext_ ontinfo">Info ONT</div>` : "";
    extContentInner += (configCRM.base.multiupload) ? `<div class="btn btn-warning ext_ multiupload" data-statusupload="void">Presiona aqui para subir todos las imagenes</div>` : "";
    extContentInner += (configCRM.monitoreo.finlosrojo) ? `<div class="btn btn-warning ext_ finlosrojo">Cerrar tkt (monitoreo)</div>` : "";
    extContentInner += (configCRM.monitoreo.sendLosRojo) ? `<div class="btn btn-warning ext_ sendlosrojo">Enviar LOS Rojo</div>` : "";
    extContentInner += (configCRM.monitoreo.alertcto) ? `<div class="btn btn-warning ext_ statuscto">CTO <span class="results"></span> reporte</div>` : "";
    extContentInner += (configCRM.monitoreo.gcounttm) ? `<div class="box ext_ gcounttm"><div class="resultado">cargando listado de tickets del cliente...</div></div>` : "";
    extContentInner += (configCRM.dgo.findgo) ? `<div class="btn btn-warning ext_ closedgo">Cerrar tkt (DGO)</div>` : "";
    extContent.innerHTML = extContentInner
    mainelement.appendChild(extContent)
    configCRM.monitoreo.gcounttm ? __getHistoryTicket(dni).then(res => {
        let thirtyDaysAgo = moment().subtract(30, 'days');
        let filteredTickets = res.filter(ticket => {
            let ticketDate = moment(ticket.fecha_creacion, 'DD/MM/YYYY HH:mm:ss'); // crea un objeto moment con el formato de la base de datos
            return ticketDate.isAfter(thirtyDaysAgo); // compara si la fecha del ticket es posterior a la de hace 30 días
        })
        return filteredTickets;
    }).then(data => {
        const count = {};
        for (const obj of data) {
            const motivo = obj.motivo;
            (count[motivo]) ? count[motivo]++ : count[motivo] = 1
        }
        return count
    }).then(res => {
        const divInterno = document.querySelector('.box.ext_.gcounttm .resultado')
        console.log(res);
        divInterno.innerHTML = ''
        if (res !== null) {
            for (const motivo in res) {
                const item = document.createElement('div');
                item.classList.add('item')
                const dataElement = document.createElement('p');
                const value = res[motivo];
                dataElement.textContent = `${motivo}: ${value}`;
                item.appendChild(dataElement);
                divInterno.appendChild(item);
            }
        } else {
            divInterno.innerHTML = '<div class="_ext loading"><i class="material-icons">cloud_off</i> <p>No se valida tickets en su historial</p></div>';
        }
    }) : '';
    if (configCRM.monitoreo.alertcto) {
        getHTML(tkt)
            .then(result => {
                document.querySelector('.ext_.statuscto .results').innerHTML = localStorage.getItem('pextReporting').includes(result) ? 'con' : 'sin'
            })
    }
    if (configCRM.base.agendar) { mainelement.querySelector(".ext_.agendados").addEventListener("click", () => CrmProcessShortly()) };
    if (configCRM.monitoreo.sendLosRojo) { mainelement.querySelector(".ext_.sendlosrojo").addEventListener("click", () => CrmProcessShortly(2)) };
    if (configCRM.monitoreo.finlosrojo) { mainelement.querySelector(".ext_.finlosrojo").addEventListener("click", () => CrmProcessShortly(3)) };
    if (configCRM.base.listTkt) { mainelement.querySelector(".ext_.ticketlist").addEventListener("click", () => openLastTipiPopUp()) };
    if (configCRM.base.serviceinfo) { mainelement.querySelector(".ext_.ontinfo").addEventListener("click", () => mostrarONTinfo()) };
    if (configCRM.base.multiupload) { mainelement.querySelector(".ext_.multiupload").addEventListener("click", (ev) => uploadFile(ev)) };
    limitchar(configCRM.base.limitChar);
    extBox.appendChild(mainelement)
}
function getUriFetch(windows) {
    const buildUri = (windows === 2 || windows === 7 || windows === 12) ? "asesor_casos_lista" : (windows === 5) ? 'asesor_agendados_lista2' : (windows === 3) ? 'visitas_lista_casos2_lista' : 'no_data'
    return buildUri;
};
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
const getRemainin2gTime = deadline => {
    let now = new Date(),
        remainTime = (new Date(deadline) - now + 1000) / 1000,
        remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
        remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
        remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
        remainDays = Math.floor(remainTime / (3600 * 24));

    return { remainSeconds, remainMinutes, remainHours, remainDays, remainTime }
};
async function fastLogin(dniAsesor, goto) {
    const url = 'http://172.27.201.14/pages/login_check.php';
    const data = new FormData();
    data.append('username', dniAsesor);
    data.append('password', dniAsesor);

    fetch(url, {
        method: 'POST',
        body: data
    })
        .then(response => {
            if (response.ok) {
                window.location.href = `http://172.27.201.14/pages/${goto}.php`
            } else {
                throw new Error('Error al iniciar sesión.');
            }
        })
        .catch(error => {
            console.error(error);
        });
};
const CrmProcessShortly = (type = 1) => {
    console.log(type)
    let desc = document.getElementById("txt_descripcion_caso")
    const mostraragendas = document.querySelector("#div_agendamiento").style;
    let descripcion = '';
    let tipificacionCustom = '';
    let now = new Date();
    document.getElementById("txt_agenda_hora").value = `${now.getHours().toString().padStart(2, '0')}:${now.getUTCMinutes().toString().padStart(2, '0')}`
    if (type === 1) {
        // type 1 = funcion para agendar en la bandeja de agendados xd
        llenadoSelect(tipificaciones.agendar);
        tipificacionCustom = baseConfig.tipiCustom.agendar;
        mostraragendas.display = "block";
    } else if (type === 2) {
        // envio visita por los rojo
        llenadoSelect(tipificaciones.vt);
        tipificacionCustom = baseConfig.tipiCustom.sendLosRojo;
        mostraragendas.display = 'none'
    } else if (type === 3) {
        // cerrar tkt por masivo pext
        llenadoSelect(tipificaciones.closelosrojo);
        tipificacionCustom = baseConfig.tipiCustom.finlosrojo;
        mostraragendas.display = 'none'
    }
    descripcion = desc.value !== "" ? desc.value : tipificacionCustom;
    desc.value = descripcion;
    if (document.getElementById("bt_guardar") !== null) {
        document.getElementById("bt_guardar").click();
    } else {
        document.getElementById("bt_save_asesor_caso").click()
    }
    // document.querySelector('.sa-button-container .confirm').click()
};
const llenadoSelect = (caseu) => {
    let caseSupp = document.getElementById("cb_tipi_caso_soporte");
    let tipo = document.getElementById("cb_tipo_tipi_cerrado");
    let motivo = document.getElementById("cb_motivo_tipi_cerrado");
    let opt1 = document.createElement("option");
    let opt2 = document.createElement("option");
    caseSupp.value = caseu.caso;
    opt1.value = caseu.tipo.value;
    opt1.text = caseu.tipo.text;
    opt1.selected = true;
    tipo.add(opt1);
    opt2.value = caseu.motivo.value;
    opt2.text = caseu.motivo.text;
    opt2.selected = true;
    motivo.add(opt2);
};
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
};
async function __getHistoryTicket(dni) {
    const response = await fetch(`ajax/soporte_asesor_casos_lista.php?id_empresa=1&id_subarea=8&buscador=${dni}&cb_busca_columna=2&ventana=2&cb_cliente_elite=3&estado=-`);
    return response.json();
    // return response
};
async function uploadFile(entity) {
    console.log(entity)
    const midata = new FormData();
    const formArea = document.forms.form_audio_adjunto;
    let dniAsesor = document.getElementById('txt_dni_asesor').value;
    let dniCliente = document.getElementById('txt_dni_cliente').value;
    let idContrato = document.getElementById('txt_id_reg').value;
    let fuente = 'AT';
    let txt_id_area_sub_det3 = document.getElementById('txt_id_area_sub_det').value;
    let toUpload = formArea.uploadedFile.files;
    midata.append('dni_asesor', dniAsesor);
    midata.append('dni_cliente', dniCliente);
    midata.append('id_venta', idContrato);
    midata.append('origen', fuente);
    midata.append('txt_id_area_sub_det', txt_id_area_sub_det3);
    midata.append('opcion1', '');
    midata.append('opcion2', '');
    midata.append('opcion3', '');
    for (let i = 0; i < toUpload.length; i++) {
        document.getElementById("div_ajax_tabla_file_subidos").innerHTML = `Subiendo ${i + 1}/${toUpload.length}`
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
};
async function getHTML(idReg) {
    let response = await fetch(`ajax/soporte_visita_mostrarinfo.php?cod_id_reg=${idReg}`);
    let html = await response.text()
    let parse = new DOMParser();
    let doc = parse.parseFromString(html, 'text/html');
    let cto = doc.getElementById('txt_cto').value;
    return cto;
};
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
};
const openLastTipiPopUp = () => {
    let dni = document.getElementById("txt_dni_cliente").value
    window.open(`ajax/atc_registro_llamada_busca_cliente_cel.php?nro_cel=&nro_doc=${dni}&txt_idarea=8&idClienteDirecTv=&txt_id_codigo_pedido=`, "historial tkt", "screenX=-1,screenY=-1,width=330,height=630,resizable=no, toolbar=false, scrollbars=no, menubar=false, status=no, directories=no")
};
const mostrarONTinfo = () => {
    let mac = document.getElementById("txt_router_mac").value
    window.open(`ajax/ws_atc_informacion_ont.php?mac=${mac.replaceAll("-", "")}`, "Info ont", "screenX=-1,screenY=-1,width=330,height=490,resizable=no, toolbar=false, scrollbars=no, menubar=false, status=no, directories=no")
    // ajax/ws_atc_informacion_ont.php
};
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
};
function fieldBuilder(...args) {
    if (typeof args === 'object') {

    }
}
function SaveSettingCrm() {
    console.log("se acciono no se de donde")
    let toChange = localDefault;
    Object.getOwnPropertyNames(toChange.profileConfig).forEach(name => {
        toChange.profileConfig[name] = document.querySelector(`#${name}_custom`).value;
    })
    Object.getOwnPropertyNames(toChange.moduleConfig).forEach(name => {
        console.log('---' + name + '---')
        Object.getOwnPropertyNames(toChange.moduleConfig[name]).forEach(m => {
            try {
                toChange.moduleConfig[name][m] = document.getElementById(`sc-${m}`).checked
            } catch (error) {
                toChange.moduleConfig[name][m] = false
            }
        })
    })
    localStorage.configCRM = JSON.stringify(toChange)
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
};
const loadModules = () => {
    document.querySelector("._box-addons").innerHTML = "";
    const perfiles = Object.getOwnPropertyNames(modulos);
    const internalLS = JSON.parse(window.localStorage.configCRM);
    perfiles.map(e => {
        if (internalLS.profileConfig.area.toLowerCase().includes(e) || e === 'base') {
            const _boxGen = document.createElement('div');
            const title = document.createElement('h3');
            const _itemTemp = document.createElement('div');
            _boxGen.classList.add("_box", e);
            title.textContent = `Herramientas ${e}`;
            _itemTemp.classList.add("item");
            _boxGen.appendChild(title);

            modulos[e].forEach(u => {
                const _subTemp = document.createElement('div');
                const labelTemp = document.createElement("label");
                const inputBuildTemp = document.createElement("input");
                const detailsTemp = document.createElement('p');
                const idTemp = `sc-${u.code}`;
                _subTemp.classList.add("_sub");
                labelTemp.setAttribute("for", idTemp);
                labelTemp.textContent = u.label;
                inputBuildTemp.type = 'checkbox';
                inputBuildTemp.name = idTemp;
                inputBuildTemp.id = idTemp;
                inputBuildTemp.dataset.area = e
                inputBuildTemp.checked = internalLS.moduleConfig[e][u.code]
                detailsTemp.textContent = u.descripcion
                _itemTemp.appendChild(_subTemp);
                _subTemp.appendChild(labelTemp);
                _subTemp.appendChild(inputBuildTemp);
                _subTemp.appendChild(detailsTemp);
            })
            _boxGen.appendChild(_itemTemp);
            document.querySelector("._box-addons").appendChild(_boxGen)
        }
    })
    document.querySelectorAll(".item [type=checkbox]").forEach((e) => {
        e.addEventListener("change", () => {
            console.log("no creo que sea este ")
            SaveSettingCrm()
        }
        );
    })

}