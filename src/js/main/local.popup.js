let tempselect = '';
for (let i = 0; i < Areas.length; i++) {
    tempselect += `<option value="${Areas[i].toString()}" ${Areas[i] === baseConfig.profileConfig.area ? 'selected' : ''}>${Areas[i].toString()}</option>`
}
const navBarMain = document.querySelector(".nav.navbar-nav.navbar-right");
const mainDropDwn = document.createElement('li')
mainDropDwn.classList.add("dropdown")
const _btnMasterConfig = `
<a href="#" class="dropdown-toggle" data-toggle="dropdown" style="margin-top:8px;" role="button">
    <i class="material-icons">settings</i>
</a>`

const _intitDropMenu = `
<div class="dropdown-menu">
    <div class="header">Configuracion de la extension</div>
    <div class="body">
        <div class="menu">
            <div class="extension content _settings">
            </div>
        </div>
    </div>
</div>`
mainDropDwn.innerHTML = _btnMasterConfig + _intitDropMenu
navBarMain.appendChild(mainDropDwn)
document.querySelectorAll(".dropdown-menu").forEach((e) => e.addEventListener('click', (ev) => ev.stopPropagation()))

const _profileSett = document.createElement('div')
_profileSett.classList.add('box', '_profile-sett')
//  `<div class="box _profile-sett"></div>`
const _boxAddOns = document.createElement('div')
_boxAddOns.classList.add('item', '_box-addons')
//  `<div class="item _box-addons"></div>`
const _boxstyles = document.createElement('div')
_boxstyles.classList.add('item', '_box-styles')
//  `<div class="item _box-addons"></div>`
mainDropDwn.querySelector(".extension.content._settings").append(_profileSett, _boxAddOns, _boxstyles)

const profileTemplate = [
    { name: "avatar_custom", type: 'text' },
    { name: "background_custom", type: 'text' },
    { name: "area_custom", type: 'select' },
]

profileTemplate.forEach(e => {
    const _itemTemp = document.createElement('div');
    _itemTemp.classList.add("item");
    let tempField = document.createElement('select');
    const labelTemp = document.createElement('label');
    if (e.type !== 'text') {
        tempField.innerHTML = tempselect
    } else {
        tempField = document.createElement('input');
        tempField.type = e.type;
        tempField.value = baseConfig.profileConfig[e.name.split("_")[0]]
    }
    tempField.name = e.name;
    tempField.id = e.name;
    labelTemp.setAttribute("for", e.name);
    labelTemp.textContent = e.name
    _itemTemp.appendChild(tempField, labelTemp)

    mainDropDwn.querySelector("._profile-sett").appendChild(_itemTemp)
})
loadModules();
//los temas bob sponja
const objStyles = Object.getOwnPropertyNames(styles);
const item_themes = document.createElement("div");
item_themes.classList.add("item")
const contentSelectThemes = document.createElement("select");
console.log(baseConfig.themePicked.now)
const presets = objStyles.map(theme => `<option value="${theme}" ${theme === baseConfig.themePicked.now ? 'selected' : ''}>${theme}</option>`)
contentSelectThemes.innerHTML = presets.join("\n")
contentSelectThemes.id = "style_theme"; contentSelectThemes.name = "style_theme";
item_themes.appendChild(contentSelectThemes)
document.querySelector("._box-styles").appendChild(item_themes);