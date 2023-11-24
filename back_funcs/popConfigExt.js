let DataReader = JSON.parse(localStorage.configCRM)
document.querySelector(".nav.navbar-nav.navbar-right").innerHTML = `
<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" style="margin-top:8px;" role="button">
    <i class="material-icons">notifications</i>
    <span class="label-count"><span class="count"></span></span>
</a>
<ul class="dropdown-menu">
    <li class="header">Configuracion de la extension</li>
    <li class="body">
        <ul class="menu">
            <ul>
                <div class="extension content _settings">
                    <div class="item">
                        <label for="avatar_custom">Avatar</label>
                        <input type="text" name="avatar_custom" id="avatar_custom" value="${DataReader.avatar}">
                    </div>
                    <div class="item">
                        <label for="banner_custom">Banner</label>
                        <input type="text" name="banner_custom" id="banner_custom" value="${DataReader.background}">
                    </div>
                    <div class="item">
                            <h3>Herramientas {beta} </h3>
                            <div class="_sub">
                                <label for="sc-ag">Agendar</label>
                                <input type="checkbox" name="sc-ag" id="sc-ag" ${(DataReader.extFunction.agendar) ? "checked" : ""}>
                            </div>
                            <div class="_sub">
                                <label for="sc-hist">Historial</label>
                                <input type="checkbox" name="sc-hist" id="sc-hist" ${(DataReader.extFunction.listTkt) ? "checked" : ""}>
                            </div>
                            <div class="_sub">
                                <label for="sc-info">Info serv.</label>
                                <input type="checkbox" name="sc-info" id="sc-info" ${(DataReader.extFunction.serviceinfo) ? "checked" : ""}>
                            </div>
                            <div class="_sub">
                                <label for="sc-clsdgo">Cerrar tkt (DGO)</label>
                                <input type="checkbox" name="sc-clsdgo" id="sc-clsdgo" ${(DataReader.extFunction.findgo) ? "checked" : ""}>
                            </div>
                            <div class="_sub">
                            <label for="sc-limitchar">Limitador de caracteres</label>
                            <input type="checkbox" name="sc-limitchar" id="sc-limitchar" ${(DataReader.extFunction.limitChar) ? "checked" : ""}>
                        </div>
                        </div>
                </div>
            </ul>
        </ul>
    </li>
    <li class="footer">
    </li>
</ul>
</li>
`

function SaveSettingCrm() {
    let toChange = {
        "TempAvatar": document.getElementById("avatar_custom").value,
        "TempBanner": document.getElementById("banner_custom").value,
        "ShortCutAgendar": document.getElementById("sc-ag").checked,
        "ShortCutHistorial": document.getElementById("sc-hist").checked,
        "ShortCutInfoServ": document.getElementById("sc-info").checked,
        "ShortCutCloseDgo": document.getElementById("sc-clsdgo").checked,
        "ShortLimitCharDesc": document.getElementById("sc-limitchar").checked,

    }
    let SaveSetting = {
        "avatar": toChange.TempAvatar,
        "background": toChange.TempBanner,
        "extFunction": {
            "agendar": toChange.ShortCutAgendar,
            "findgo": toChange.ShortCutCloseDgo,
            "listTkt": toChange.ShortCutHistorial,
            "serviceinfo": toChange.ShortCutInfoServ,
            "limitChar": toChange.ShortLimitCharDesc
        }
    }
    localStorage.configCRM = JSON.stringify(SaveSetting)
}
let banner = document.getElementById("banner_custom")
let avatar = document.getElementById("avatar_custom")
avatar.addEventListener("input", (e) => {
    document.querySelector(".user-info .image img").src = e.target.value
    SaveSettingCrm();
})
banner.addEventListener("input", (e) => {
    document.querySelector(".user-info").style.backgroundImage = `url(${e.target.value})`
    SaveSettingCrm();
})
avatar.addEventListener("click", (e) => e.target.select())
banner.addEventListener("click", (e) => e.target.select())
document.querySelectorAll(".item [type=checkbox]").forEach((e) => {
    e.addEventListener("change", () => SaveSettingCrm())
})