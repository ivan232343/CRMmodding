
let niu = document.createElement('ul')
niu.classList.add('nav', 'navbar-nav', 'navbar-right')
document.querySelector("#navbar-collapse").appendChild(niu).innerHTML = `
<li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown" style="margin-top:8px;" role="button"
        aria-expanded="true">
        <i class="material-icons">notifications</i>
        <span class="label-count"><span class="count"></span></span>
    </a>
    <ul class="dropdown-menu">
        <div class="main_box">
            <li class="header"> ???? aun no se que nombre poner</li>
            <li class="body">
                <div class="menu">
                    <div class="extension content _getcto">
                        <div class="advertencias">
                            <p>Aqui podras obtener los CTO dependiendo el motivo</p>
                            <span>Advertencia: Dependiendo de la cantidad de tickets, demorara la consulta, ten
                                paciencia</span>
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
            </li>
        </div>
    </ul>
</li>
`;

async function getHTML(idReg) {
    const div = document.querySelector('.extension.content._getcto .resultado');
    div.innerHTML = 'trantando la data del servidor...';
    let response = await fetch(`ajax/soporte_visita_mostrarinfo.php?cod_id_reg=${idReg}`);
    let html = await response.text();
    let parse = new DOMParser();
    let doc = parse.parseFromString(html, 'text/html');
    let cto = doc.getElementById('txt_cto').value;
    return cto;
}
async function getDataTable() {
    const div = document.querySelector('.extension.content._getcto .resultado');
    div.innerHTML = 'cargando datos del servidor...';
    let buscador = document.querySelector("#txt_busca").value;
    let idEmpresa = document.querySelector("#txt_id_empresa").value;
    let dniUser = document.querySelector("#txt_dni_usuario").value;
    let idSubArea = document.querySelector("#txt_id_subarea").value;
    let estado = document.querySelector("#busca_estado").value;
    let cbSearchCol = document.querySelector("#cb_busca_columna").value;
    let cbClienteElite = document.querySelector("#cb_elite_cliente").value;
    let ventana = 2;
    try {
        let url = `ajax/soporte_asesor_casos_lista.php?id_empresa=${idEmpresa}&dni_usuario=${dniUser}&id_subarea=${idSubArea}&buscador=${buscador}&estado=${estado}&cb_busca_columna=${cbSearchCol}&ventana=${ventana}&cb_cliente_elite=${cbClienteElite}`
        const response = await fetch(url);
        const data = await response.json();
        const count = {};
        for (const obj of data) {
            const motivo = obj.motivo;
            (count[motivo]) ? count[motivo]++ : count[motivo] = 1
        }

        return { "data": data, "counteo": count };
    } catch (error) {
        console.error(error);
    }
}
document.querySelector("#btn_get_cto_data").addEventListener("click", (e) => {
    e.preventDefault();
    // http://172.27.201.14/pages/ajax/soporte_asesor_casos_lista.php?id_empresa=1&dni_usuario=72510503&id_subarea=8&buscador=&estado=1&cb_busca_columna=0&ventana=2&cb_cliente_elite=3
    // let uwu = getDataTable()
    // const getdataTemp = [];
    const motivo = document.querySelector("#s_data_to").value
    const promises = [];
    getDataTable().then(data => {
        data.data.forEach((e) => e.motivo === motivo ? promises.push(getHTML(e.id_reg)) : "");
        Promise.all(promises)
            .then(results => {
                const div = document.querySelector('.extension.content._getcto .resultado');
                div.innerHTML = 'Acomodando los datos, un momento mas...';
                console.log(results)
                if (results.length > 0) {
                    let conteo = results.length
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
                    const item = document.createElement('div');
                    const dataElement = document.createElement('p');
                    keys.forEach((key) => {
                        const item = document.createElement('div');
                        const dataElement = document.createElement('p');
                        const value = results[key];
                        dataElement.textContent = `${key}: ${value}`;
                        item.appendChild(dataElement);
                        div.appendChild(item);
                        // const valueElement = document.createElement('p');
                        // valueElement.textContent = value;
                    });
                    for (const motivo in data.counteo) {
                        const item = document.createElement('div');
                        const dataElement = document.createElement('p');
                        const value = data.counteo[motivo];
                        dataElement.textContent = `${motivo}: ${value}`;
                        item.appendChild(dataElement);
                        div.appendChild(item);
                    }
                    dataElement.innerHTML = `<p>Casos totales de ${motivo} es: ${conteo}<br>${data.counteo}</p>`
                    item.appendChild(dataElement);
                    div.appendChild(item);
                    // getCountDataTable().then(e => { ; })
                    // valueElement.textContent = value;

                } else {
                    div.innerHTML = 'No se encontraron datos';
                }

            })
            .catch(error => {
                console.log(error)
            })
    })
})
