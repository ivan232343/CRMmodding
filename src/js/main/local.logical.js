let banner = document.getElementById("background_custom");
let avatar = document.getElementById("avatar_custom");
let areaSelected = document.getElementById("area_custom");
let themeSelected = document.getElementById("style_theme");
avatar.addEventListener("input", (e) => {
    if (e.target.value === "") {
        e.target.value = "https://appcrm.win.pe/images/user.png"
    }
    document.querySelector(".user-info .image img").src = e.target.value;
    SaveSettingCrm();
})
banner.addEventListener("input", (e) => {
    console.log(e)
    if (e.target.value === "") {
        e.target.value = "https://appcrm.win.pe/images/user-img-background.jpg"
    }
    document.querySelector(".user-info").style.backgroundImage = `url(${e.target.value})`;
})
avatar.addEventListener("click", (e) => e.target.select())
banner.addEventListener("click", (e) => e.target.select())
areaSelected.addEventListener("change", () => {
    console.log("quiza este?")
    SaveSettingCrm();
    loadModules();
    document.querySelectorAll(".email")[1].innerText = `Area: AT - ${JSON.parse(localStorage.configCRM).profileConfig.area}`;
})
themeSelected.addEventListener("change", (e) => {
    if (JSON.parse(localStorage.configCRM).themePicked.now !== 'ninguno') {
        const confirmReload = confirm("Se valida que ya cuenta con un tema establecido\nSe actualizara la pagina para aplicar los cambios")
        if (confirmReload) {
            location.reload();
            SaveSettingCrm();
            // applyStyles(styles[e.target.value])
        }
    } else {
        SaveSettingCrm();
        applyStyles(styles[e.target.value])
    }
})