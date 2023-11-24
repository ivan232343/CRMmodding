let niu = document.createElement('ul')
niu.classList.add('nav', 'navbar-nav', 'navbar-right')
document.querySelector("#navbar-collapse").appendChild(niu).innerHTML = `
<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" style="margin-top:8px;"
        role="button" aria-expanded="true">
        <i class="material-icons">notifications</i>
        <span class="label-count"><span class="count"></span></span>
    </a>
    <ul class="dropdown-menu">
        <li class="header"> ???? aun no se que nombre poner</li>
        <li class="body">
            <ul class="menu">
                <ul>
                    <div class="extension content _getcto">
                      <p>Aqui podras obtener los CTO dependiendo el motivo</p>
                      <span>Advertencia: Dependiendo de la cantidad de tickets, demorara la consulta, ten paciencia</span>
                      <div class="resultado">

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