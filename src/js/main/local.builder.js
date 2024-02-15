const localDefault = {
    "profileConfig": {
        "avatar": "https://appcrm.win.pe/images/user.png",
        "background": "https://appcrm.win.pe/images/user-img-background.jpg",
        "area": "Residencial"
    },
    "moduleConfig": {
        "base": {
            "agendar": true,
            "listTkt": true,
            "serviceinfo": true,
            "limitChar": false,
            "multiupload": true,
            "copytable": true
        },
        "monitoreo": {
            "alertcto": false,
            "sendLosRojo": false,
            "syncPext": false,
            "finlosrojo": false,
            "gcounttm": false,
        },
        "dgo": {
            "findgo": false,
        }
    },
    "styleConfig": {
        "color1": "",
        "color2": "",
        "color3": "",
        "color4": "",
        "color5": "",
        "color6": "",
        "color7": "",
        "color8": "",
        "color9": "",
    },
    "tipiCustom": {
        "agendar": "se agenda para tratamiento al cliente",
        "sendlosRojo": "se envia vt por LOS ROJO",
        "finlosrojo": "cliente dentro del masivo se cierra tkt",
        "findgo": "se valida acceso cliente brinda conformidad se cierra ticket",
    },
    "version": 12.5
}

const baseConfig = JSON.parse(typeof window.localStorage.configCRM !== 'undefined' ? window.localStorage.configCRM : '{"error":true}');
if (baseConfig.error) {
    localStorage.setItem("configCRM", JSON.stringify(localDefault))
} else if (baseConfig.version !== localDefault.version) {
    localStorage.setItem("configCRM", JSON.stringify(localDefault))
}

const modulos = {
    base: [{
        code: "agendar",
        label: "agendamiento",
        descripcion: "agendate el ticket de manera instantanea"
    }, {
        code: "listTkt",
        label: "Listar Historico de llamadas",
        descripcion: "Lista el historico de llamadas en una ventana emergente\n¡¡ESTO SOLO FUNCIONA DENTRO DEL TICKET!!"
    }, {
        code: "serviceinfo",
        label: "Detalles del servicio",
        descripcion: "Muestra un detallado del servicio del cliente en una ventana emergente\n¡¡ESTO SOLO FUNCIONA DENTRO DEL TICKET!!"
    }, {
        code: "limitChar",
        label: "Limitar caracteres",
        descripcion: "Limita los caracteres en la descripcion del ticket"
    }, {
        code: "multiupload",
        label: "Unlock multi images",
        descripcion: "Desbloquea el limite de subida de evidencias en los tickets puedes subir mas de 1 a un solo click"
    }, {
        code: "copytable",
        label: "Copy values",
        descripcion: "Copia los valores de la tabla donde hagas click de la tabla de casos"
    }, {
        code: "gcounttmr",
        label: "Conteo de tickets mensuales minificado",
        descripcion: "Visualiza la cantidad de tickets por tipo segun el motivo"
    }],
    monitoreo: [{
        code: "sendLosRojo",
        label: "Enviar LOS ROJO",
        descripcion: "Auto completa la tipificacion VISITA TECNICA EXTERNA - Visita tecnica externa - Envio LOS rojo con una pequeña descripcion\nPuedes colocar la observacion que tu quieres y tomara ese como tipificacion principal"
    }, {
        code: "finlosrojo",
        label: "Cerrar ticket LOS",
        descripcion: "Auto completa la tipificacion SOPORTE(AT) - Problemas con el servicio - Internet - Luz LOS en rojo con una pequeña descripcion\nPuedes colocar la observacion que tu quieres y tomara ese como tipificacion principal"
    }, {
        code: "gcounttm",
        label: "Conteo de tickets mensuales minificado",
        descripcion: "Visualiza la cantidad de tickets por tipo segun el motivo"
    }],
    dgo: [{
        code: "findgo",
        label: "Cerrar ticket DGO",
        descripcion: "Auto completa la tipificacion SOPORTE(AT) - Problemas con el servicio - Internet - sin acceso a pagina web con una pequeña descripcion\nPuedes colocar la observacion que tu quieres y tomara ese como tipificacion principal"
    }],
    ignorados: [{
        code: "syncPext",
        label: "Sincronizacion PEXT",
        descripcion: "(PROBLEMAS DE RENDIMIENTO) Funciona de la mano con \"CTO en masivo\" no se recomienda activar ambos"
    }, {
        code: "alertcto",
        label: "CTO en masivo",
        descripcion: "(EXPERIMENTAL) Alerta si el cto del cliente ya se encuentra dentro del masivo"
    }]
}
const tipificaciones = {
    vt: {
        caso: 34,
        tipo: { value: '207', text: 'Visita tecnica Externa' },
        motivo: { value: '1707', text: 'Los rojo' }
    },
    closelosrojo: {
        caso: 32,
        tipo: { value: '202', text: 'Problemas con el servicio' },
        motivo: { value: '407', text: 'Internet - Luz LOS en rojo' },
    },
    closedgo: {
        caso: 32,
        tipo: { value: '202', text: 'Problemas con el servicio' },
        motivo: { value: '408', text: 'Internet - sin acceso a pagina web' },
    },
    agenda: {
        caso: 36,
        tipo: { value: '244', text: 'Agendamiento' },
        motivo: { value: '635', text: 'Se agenda llamada' },

    }
}