const showServiceInfo = () => {
    let mac = document.getElementById("txt_router_mac").value.replaceAll("-", "");
    let parametros = `mac=${mac}`
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "ajax/ws_atc_informacion_ont.php?");
    xhr.setRequestHeader("Charset", "UTF-8");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(parametros);
    xhr.getResponseHeader("Content-type", "text/html");
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === 4) {

            enHtml = e.target.response
        }
    }
    xhr.abort()
    xhr.open('POST', 'ajax/ws_wincrm.php?');
    xhr.setRequestHeader("Charset", "UTF-8");
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    window.open(enHtml, "Info ont", "screenX=-1,screenY=-1,width=330,height=490,resizable=no, toolbar=false, scrollbars=no, menubar=false, status=no, directories=no")
}