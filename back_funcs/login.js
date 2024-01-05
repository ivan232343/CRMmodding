if (ValidatePath('login_form')) {
    async function fastlogin(credenciales, Goto) {

        const url = 'http://172.27.201.14/pages/login_check.php';
        const data = new FormData();
        data.append('username', credenciales);
        data.append('password', credenciales);

        fetch(url, {
            method: 'POST',
            body: data
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = `http://172.27.201.14/pages/soporte_${Goto}.php`
                } else {
                    throw new Error('Error al iniciar sesión.');
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
    let master = document.querySelector('.login-box .card');
    let footerCreate = document.createElement('div');
    footerCreate.classList.add('footer');
    footerCreate.innerHTML = `
        <div class="box">
        <button class="agendados"> a mis agendados</button>
        <button class="asesor_casos"> a bandeja de casos</button>
        </div>
        <div class="status">
</div>
        `;
    master.appendChild(footerCreate)
    footerCreate.querySelectorAll('button').forEach((e) => {
        e.addEventListener('click', (ev) => {
            let user = document.querySelector('input[name=username]').value
            if (localStorage.getItem('credentials') === null || localStorage.getItem('credentials') === '') {
                if (user === '') {
                    footerCreate.querySelector('.status').innerHTML = 'Por favor llene el campo de nombre de usuario'
                    setTimeout(() => {
                        footerCreate.querySelector('.status').style.display = 'none'
                    }, 5000)
                } else {
                    localStorage.setItem('credentials', user)
                    fastlogin(localStorage.getItem('credentials'), ev.target.classList[0])
                }
            } else {
                fastlogin(localStorage.getItem('credentials'), ev.target.classList[0])
            }
            // console.log(ev.target.classList[0], user)
            // fastlogin(user,)
        })
    });


}