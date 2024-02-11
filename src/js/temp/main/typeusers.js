const perfiles = ["residencial", "monitoreo", "dgo", "gamer", "dev"]
if (localStorage.getItem('perfil') !== null) {

} else {
    localStorage.setItem('perfil', perfiles[0])
}
