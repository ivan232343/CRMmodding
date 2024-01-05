
let modifidier = 0
for (let styleindex = 0; styleindex < document.styleSheets.length; styleindex++) {
    const stylesheet = document.styleSheets[styleindex];
    const linkvalidate = stylesheet.href !== null ? stylesheet.href : '';
    // console.log(linkvalidate.includes('all-themes.css'))
    if (linkvalidate.includes('all-themes.css')) {
        modifidier = styleindex
    }
}
// elementos para pintar color morado oscuro
document.styleSheets[modifidier].addRule("a.toggled.waves-effect, a.waves-effect.waves-block:hover, a.waves-effect.waves-block:hover > *,.spinner-layer.pl-red", "color:rgb(117, 60, 255) !important")
document.styleSheets[modifidier].addRule(".bg-indigo, .bg-blue,#div_client_elite", "background: #462f76 !important;")
document.styleSheets[modifidier].addRule(".input-group .form-line:after,.input-group .form-line", "border:unset !important;position: unset !important;content: unset !important;")
document.styleSheets[modifidier].addRule(".body,.bg-custom", "background: #462f76e3;color: white !important;")
document.styleSheets[modifidier].addRule("button.bg-indigo", "background: #6028d5 !important;border-radius: 1rem !important;box-shadow: #340839 2px 2px 12px 2px !important;")
document.styleSheets[modifidier].addRule(".theme-deep-orange .navbar ", "background: #6028d5 ;")
document.styleSheets[modifidier].addRule(".theme-deep-orange .navbar ,.theme-red .navbar", " background-color: #472d7dc2 !important;box-shadow: unset;-webkit-box-shadow: unset;-moz-box-shadow: unset;-ms-box-shadow: unset;")
document.styleSheets[modifidier].addRule("table.table.table.bg-blue a, table.table.table.bg-blue a:active, table.table.table.bg-blue a:focus", "   background-color: unset !important;color: white;text-decoration: none;font-weight: bolder;font-size: 1.5rem;word-break: break-word;")
document.styleSheets[modifidier].addRule(".sidebar .legal .copyright ", "word-break: break-word;text-wrap: pretty !important;color:white;")
document.styleSheets[modifidier].addRule(".theme-red .sidebar .legal ", "background-color: #000;")


// 40319340
