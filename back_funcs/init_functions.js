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
