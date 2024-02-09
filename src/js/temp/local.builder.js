if (localStorage.getItem("configCRM") === null) {
    const localDefault = {
        "profileConfig": {
            "avatar": "images/user.png",
            "background": "images/user-img-background.jpg",
            "area": "Residencial"
        },
        "moduleConfig": {
            "base": {
                "agendar": true,
                "listTkt": true,
                "serviceinfo": true,
                "limitChar": false,
                "multiupload": true,
            },
            "monitoreo": {
                "alertcto": false,
                "sendLosRojo": false,
                "syncPext": false,
                "finlosrojo": false,
                "gcounttm": false,
            },
            "olvidados": {
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
            "sendLosRojo": "se envia vt por LOS ROJO",
            "finlosrojo": "cliente dentro del masivo se cierra tkt",
            "findgo": "se valida acceso cliente brinda conformidad se cierra ticket",
        }
    }
    localStorage.setItem("configCRM", JSON.stringify(localDefault))
}
const baseConfig = JSON.parse(window.localStorage.configCRM);
const modulos = {
    "base": [{
        code: "agendar",
        nombre: "agendamiento",
        descripcion: "agendate el ticket de manera instantanea"
    }, {
        code: "listTkt",
        nombre: "Listar Historico de llamadas",
        descripcion: "Lista el historico de llamadas en una ventana emergente\n¡¡ESTO SOLO FUNCIONA DENTRO DEL TICKET!!"
    }, {
        code: "serviceinfo",
        nombre: "Detalles del servicio",
        descripcion: "Muestra un detallado del servicio del cliente en una ventana emergente\n¡¡ESTO SOLO FUNCIONA DENTRO DEL TICKET!!"
    }, {
        code: "limitChar",
        nombre: "Limitar caracteres",
        descripcion: "Limita los caracteres en la descripcion del ticket"
    }, {
        code: "multiupload",
        nombre: "Unlock multi images",
        descripcion: "Desbloquea el limite de subida de evidencias en los tickets puedes subir mas de 1 a un solo click"
    }],
    "monitoreo": [{
        code: "alertcto",
        nombre: "CTO en masivo",
        descripcion: "(EXPERIMENTAL) Alerta si el cto del cliente ya se encuentra dentro del masivo"
    }, {
        code: "sendLosRojo",
        nombre: "Enviar LOS ROJO",
        descripcion: "Auto completa la tipificacion VISITA TECNICA EXTERNA - Visita tecnica externa - Envio LOS rojo con una pequeña descripcion\nPuedes colocar la observacion que tu quieres y tomara ese como tipificacion principal"
    }, {
        code: "syncPext",
        nombre: "Sincronizacion PEXT",
        descripcion: "(PROBLEMAS DE RENDIMIENTO) Funciona de la mano con \"CTO en masivo\" no se recomienda activar ambos"
    }, {
        code: "finlosrojo",
        nombre: "Cerrar ticket LOS",
        descripcion: "Auto completa la tipificacion SOPORTE(AT) - Problemas con el servicio - Internet - Luz LOS en rojo con una pequeña descripcion\nPuedes colocar la observacion que tu quieres y tomara ese como tipificacion principal"
    }],
    "olvidados": [{
        code: "findgo",
        nombre: "Cerrar ticket DGO",
        descripcion: "Auto completa la tipificacion SOPORTE(AT) - Problemas con el servicio - Internet - sin acceso a pagina web con una pequeña descripcion\nPuedes colocar la observacion que tu quieres y tomara ese como tipificacion principal"
    }]
}