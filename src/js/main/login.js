if (ValidatePath('login_form')) {
    async function fastlogin(credenciales, Goto) {

        const url = 'login_check.php';
        const data = new FormData();
        data.append('username', credenciales);
        data.append('password', credenciales);

        fetch(url, {
            method: 'POST',
            body: data
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = `${Goto}.php`
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
        <button class="soporte_agendados"> a mis agendados</button>
        <button class="soporte_asesor_casos"> a bandeja de casos</button>
        <button class="atc_registro_llamadas"> a contacto</button>
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

// e807f1fcf82d132f9bb018ca6738a19f.64196a5c43ef0aa1b3479bbede46debe.33ef0b766a285f9e7e7087f216742bfd
// e807f1fcf82d132f9bb018ca6738a19f.64196a5c43ef0aa1b3479bbede46debe.33ef0b766a285f9e7e7087f216742bfd
// e807f1fcf82d132f9bb018ca6738a19f.64196a5c43ef0aa1b3479bbede46debe.33ef0b766a285f9e7e7087f216742bfd
// e807f1fcf82d132f9bb018ca6738a19f.56465624f2a8fc51439f3b67f5a64ddc.aa3b7b96fccaab6f2a25f3bf6277073e
// e807f1fcf82d132f9bb018ca6738a19f.43a4b3e8c0675604c9015e3d60cf52b4.1c8075effbd54c857fec4bf69cfd5502
