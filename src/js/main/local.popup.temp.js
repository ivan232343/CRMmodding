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

mainDropDwn.querySelector(".extension.content._settings").append(_profileSett, _boxAddOns)

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
const perfiles = Object.getOwnPropertyNames(modulos);
perfiles.map(e => {
    if (baseConfig.profileConfig.area.toLowerCase().includes(e) || e === 'base') {
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
            inputBuildTemp.checked = baseConfig.moduleConfig.base[u.code]
            detailsTemp.textContent = u.descripcion
            _itemTemp.appendChild(_subTemp);
            _subTemp.appendChild(labelTemp);
            _subTemp.appendChild(inputBuildTemp);
            _subTemp.appendChild(detailsTemp);
        })
        _boxGen.appendChild(_itemTemp);
        mainDropDwn.querySelector("._box-addons").appendChild(_boxGen)
    }
})