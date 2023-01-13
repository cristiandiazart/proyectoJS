
const usuarios = [{
    nombre: 'marta',
    mail: 'marta@mail.com',
    pass: '123m',

},
{
    nombre: 'sandro',
    mail: 'sandro@mail.com',
    pass: 'damefuego123',

},

{
    nombre: 'cajlo',
    mail: 'cajlito@mail.com',
    pass: 'terelover123',
    


}]

const equipos = [

    {nombre:'sony a7 III',
    precio: 10000,
    img: './img/a7 III.jpg',
    sensor:'fullframe',
    resolucion: '4k'
    },
    {nombre:'sony a7 SIII',
    precio: 20000,
    img: './img/a7 SIII.jpg',
    sensor:'fullframe',
    resolucion: '4k'
    },
    
    {nombre:'sony fx3',
    precio: 25000,
    img: './img/fx3.jpg',
    sensor:'fullframe',
    resolucion: '4k'
    },

]


const mailLogin = document.getElementById('emailLogin'),
    passLogin = document.getElementById('passwordLogin'),
    recordar = document.getElementById('recordarme'),
    btnLogin = document.getElementById('login'),
    modalEl = document.getElementById('modalLogin'),
    modal = new bootstrap.Modal(modalEl),
    contTarjetas = document.getElementById('tarjetas'),
    toggles = document.querySelectorAll('.toggles');

function guardarDatos(usuarioDB,storage) {
    const usario = {
        'name': usuarioDB.nombre,
        'user': usuarioDB.mail,
        'pass': usuarioDB.pass
    }    

    storage.setItem ('usuario', JSON.stringify (usario));

}

    function recuperarUsuario (storage){
        let usuarioEnStorage = JSON.parse(storage.getItem ('usuario'));
        return usuarioEnStorage;
    }

    function saludar (usuario){
        nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.name}</span>`
    }

    function mostrarInfoEquipos(array){
        contTarjetas.innerHTML = '';
        array.forEach(element => {
            let html = `<div class= "cardEquipo " id="tarjeta${element.nombre}">
            <h3 class="card-header" id="nombreEquipo">nombre: ${element.nombre}</h3>
            <img src="${element.img}" alt = "${element.nombre}"
            class = "card-img-top" id= "fotoEquipo">
            <div class="card-body">
            <p class="card-text" id="sensorEquipo">sensor: ${element.sensor}</p>
            <p class="card-text" id="resolucionEquipo">resolucion: ${element.resolucion} </p>
            <button type="button" class="btn btn-primary">agregar al carrito</button>


        </div>

            
            
            
            
            </div>`;
            contTarjetas.innerHTML +=html;
        });
    }

    function presentarInfo(array, clase) {
        array.forEach(element => {
            element.classList.toggle(clase);
        });
    }

    function validarUsuario(usersDB,user,pass){
        let encontrado =usersDB.find((userDB)=> userDB.mail== user);

        if (typeof encontrado === 'undefined'){
            return false;
        } else {
            if (encontrado.pass != pass){
                return false;
            }else {
                return encontrado;
            }
        }
    }

    btnLogin.addEventListener('click', (e) => {
        e.preventDefault();
    
        if (!mailLogin.value || !passLogin.value) {
            alert('Todos los campos son requeridos');
        } else {
            let data = validarUsuario(usuarios, mailLogin.value, passLogin.value);
    
            if (!data) {
                alert(`Usuario y/o contraseña erróneos`);
            } else {
    

                if (recordar.checked) {
                    guardarDatos(data, localStorage);
                    saludar(recuperarUsuario(localStorage));
                } else {
                    guardarDatos(data, sessionStorage);
                    saludar(recuperarUsuario(sessionStorage));
                }

                modal.hide();
                mostrarInfoEquipos(equipos);
                presentarInfo(toggles, 'd-none');
            }
        }
    });
    
    btnLogout.addEventListener('click', () => {
        borrarDatos();
        presentarInfo(toggles, 'd-none');
    });
    
    estaLogueado(recuperarUsuario(localStorage));