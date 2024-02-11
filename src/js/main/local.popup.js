if (!ValidatePath(['index', 'login_form']).some(path => path)) {
    let tempselect = '';
    for (let i = 0; i < Areas.length; i++) {
        console.log(Areas[i], baseConfig.profileConfig.area, baseConfig.profileConfig.area === Areas[i])
        tempselect += `<option value="${Areas[i].toString()}" ${Areas[i] === baseConfig.profileConfig.area ? 'selected' : ''}>${Areas[i].toString()}</option>`
    }
    console.log(tempselect)
    document.querySelector(".nav.navbar-nav.navbar-right").innerHTML = `
    <li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown" style="margin-top:8px;" role="button">
        <i class="material-icons">settings</i>
        <span class="label-count"><span class="count"></span></span>
    </a>
    <div class="dropdown-menu">
        <div class="header">Configuracion de la extension</div>
        <div class="body">
            <div class="menu">
                <div class="extension content _settings">
                    <div class="box _profile-sett">
                        <div class="item">
                            <label for="avatar_custom">Avatar</label>
                            <input type="text" name="avatar_custom" id="avatar_custom" value="${baseConfig.profileConfig.avatar}">
                        </div>
                        <div class="item">
                            <label for="banner_custom">Banner</label>
                            <input type="text" name="banner_custom" id="banner_custom" value="${baseConfig.profileConfig.background}">
                        </div>
                        <div class="item">
                            <label for="profile_area">Area</label>
                            <select name="profile_area" id="profile_area">${tempselect}</select>
                        </div>
                    </div>
                    <div class="item _box-addons">
                        <div class="_box general">
                            <h3>Herramientas general</h3>
                            <div class="item">
                                <div class="_sub">
                                    <label for="sc-ag">Agendar</label>
                                    <input type="checkbox" name="sc-ag" id="sc-ag" ${(baseConfig.moduleConfig.base.agendar) ? "checked" : ""}>
                                </div>
                                <div class="_sub">
                                    <label for="sc-multiupload">Multi Upload image</label>
                                    <input type="checkbox" name="sc-multiupload" id="sc-multiupload"
                                        ${(baseConfig.moduleConfig.base.multiupload) ? "checked" : ""}>
                                </div>
                                <div class="_sub">
                                    <label for="sc-hist">Historial</label>
                                    <input type="checkbox" name="sc-hist" id="sc-hist"
                                        ${(baseConfig.moduleConfig.base.listTkt) ? "checked" : ""}>
                                </div>
                                <div class="_sub">
                                    <label for="sc-info">Info serv.</label>
                                    <input type="checkbox" name="sc-info" id="sc-info"
                                        ${(baseConfig.moduleConfig.base.serviceinfo) ? "checked" : ""}>
                                </div>
                                <div class="_sub">
                                    <label for="sc-copytable">Limitador de caracteres</label>
                                    <input type="checkbox" name="sc-copytable" id="sc-copytable"
                                    ${(baseConfig.moduleConfig.base.copytable) ? "checked" : ""}>
                                </div>
                                <div class="_sub">
                                    <label for="sc-limitchar">Limitador de caracteres</label>
                                    <input type="checkbox" name="sc-limitchar" id="sc-limitchar"
                                        ${(baseConfig.moduleConfig.base.limitChar) ? "checked" : ""}>
                                </div>
                            </div>
                        </div>
                        <div class="_box monitoreo">
                            <h3>Monitoreo</h3>
                            <div class="item">
                                <div class="_sub">
                                    <label for="sc-alertcto">Alertar CTO</label>
                                    <input type="checkbox" name="sc-alertcto" id="sc-alertcto"
                                        ${(baseConfig.moduleConfig.monitoreo.alertcto) ? "checked" : ""}>
                                </div>
                                <div class="_sub">
                                    <label for="sc-syncpext">Sync cto de PEXT(problemas de rendimiento)</label>
                                    <input type="checkbox" name="sc-syncpext" id="sc-syncpext"
                                        ${(baseConfig.moduleConfig.monitoreo.syncPext) ? "checked" : ""}>
                                </div>
                                <div class="_sub">
                                    <label for="sc-slosrojo">Enviar LOS ROJO</label>
                                    <input type="checkbox" name="sc-slosrojo" id="sc-slosrojo"
                                        ${(baseConfig.moduleConfig.monitoreo.sendLosRojo) ? "checked" : ""}>
                                </div>
                                <div class="_sub">
                                    <label for="sc-closelosrojo">Cerrar tkt LOS ROJO</label>
                                    <input type="checkbox" name="sc-closelosrojo" id="sc-closelosrojo"
                                        ${(baseConfig.moduleConfig.monitoreo.sendLosRojo) ? "checked" : ""}>
                                </div>
                                <div class="_sub">
                                    <label for="sc-gcounttm">conteo de motivo al mes</label>
                                    <input type="checkbox" name="sc-gcounttm" id="sc-gcounttm"
                                        ${(baseConfig.moduleConfig.monitoreo.gcounttm) ? "checked" : ""}>
                                </div>
                            </div>
                        </div>
                        <div class="_box dgo">
                            <h3>DGO</h3>
                            <div class="item">
                                <div class="_sub">
                                    <label for="sc-clsdgo">Cerrar tkt (DGO)</label>
                                    <input type="checkbox" name="sc-clsdgo" id="sc-clsdgo"
                                        ${(baseConfig.moduleConfig.olvidados.findgo) ? "checked" : ""}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item _box-extrasconfig">
                        <div class="_box fastlogin">
                            <div class="area-form">
                                <label for="dniasesor">Configura tu logeo rapido</label>
                                <input type="password" name="dniasesor" id="dniasesor">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
        </div>
    </div>
</li>
`
}