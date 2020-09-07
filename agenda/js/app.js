
(function () {
    "use strict";
    const formulario = document.querySelector('#contacto');
    const listadoContacto = document.querySelector('.listado-contacto tbody');
    const buscador = document.querySelector('#buscador');
   


    eventListeners();
    numeroContactos();

    function eventListeners(){

        formulario.addEventListener('submit', enviarFormulario);
        if (listadoContacto){
            listadoContacto.addEventListener('click',borrarContacto);
        }
        buscador.addEventListener('input',buscarContactos);

    };

    function enviarFormulario(e) {
    
        e.preventDefault();
        const nombre = document.getElementById('nombre').value,
            empresa = document.getElementById('empresa').value,
            telefono = document.getElementById('telefono').value,
            accion = document.querySelector('#accion').value;  

            if(nombre === '' || empresa === '' || telefono === ''){
                mostrarNotificacion("Error...", 'error');
            
            }else{
                console.log(accion);
                    const newformulario = new FormData();
                    newformulario.append('nombre', nombre);
                    newformulario.append('empresa', empresa);
                    newformulario.append('telefono', telefono);
                    newformulario.append('accion', accion);
                if(accion === 'crear'){
                    inserDb(newformulario);
                }else {
                    const id = document.querySelector('#id').value;
                    newformulario.append('id',id);
                    console.log(id);
                    editarContacto(newformulario);
                }

            }
    };



    function inserDb(datos){

        var xhr = new XMLHttpRequest();

        xhr.open('POST','./includes/modelos/modelos-contacto.php' , true);

        xhr.onload = function(){
            if(this.status == 200 ){
                var respuesta = JSON.parse(xhr.responseText);
                console.log(respuesta);
                if(respuesta.respuesta === "correcto" ) {
                
                    const nuevoContacto = document.createElement('tr');
                    nuevoContacto.innerHTML = `
                        <td>${respuesta.datos.nombre}</td>
                        <td>${respuesta.datos.empresa}</td>
                        <td>${respuesta.datos.telefono}</td>
                    `;

                    const contenedorAcciones = document.createElement('td');

                    const iconoEditar = document.createElement('i');
                    iconoEditar.classList.add('fas','fa-pen-square');

                    const btnEditar = document.createElement('a');
                    btnEditar.appendChild(iconoEditar);
                    btnEditar.href = `editar.php?id=${respuesta.datos.id}`;
                    btnEditar.classList.add('btn','btn-editar');

                    contenedorAcciones.appendChild(btnEditar);

                    const iconoBorrar = document.createElement('i');
                    iconoBorrar.classList.add('fas','fa-trash-alt');
                    const btnBorrar = document.createElement('button');
                    btnBorrar.appendChild(iconoBorrar);
                    btnBorrar.setAttribute('data-id',respuesta.datos.id);
                    btnBorrar.classList.add('btn','btn-borrar');

                    contenedorAcciones.appendChild(btnBorrar);
                    nuevoContacto.appendChild(contenedorAcciones);

                    listadoContacto.appendChild(nuevoContacto);

                    mostrarNotificacion("Creaste con exito", 'correcto');

                    document.querySelector('form').reset();

                }
            }
        }
        xhr.send(datos)

    }



    function mostrarNotificacion(mensaje, clase ){
        const contenedor = document.createElement('div');
        contenedor.classList.add('mensaje', 'sombra',clase);
        contenedor.textContent = mensaje;    
        formulario.insertBefore(contenedor,document.querySelector('form legend'));
        setTimeout(()=>{
            contenedor.classList.add('visible')
            setTimeout(()=>{
                contenedor.classList.remove('visible');
                setTimeout(()=>{
                    contenedor.remove();
                },500)
            },3000)
        },100)
    };


    function borrarContacto(e){
        if(e.target.parentElement.classList.contains('btn-borrar')){

            const seguro = confirm('Estas seguro?');
            
            if(seguro){
                const id = e.target.parentElement.getAttribute('data-id');
                console.log(id);

                var xhr = new XMLHttpRequest();

                xhr.open('GET', `includes/modelos/modelos-contacto.php?id=${id}&accion=borrar`, true);

                xhr.onload = function(){

                    if(this.status === 200){
                        var respuesta = JSON.parse(xhr.responseText);
                        console.log(respuesta);
                        if(respuesta.correcto === "correcto"){
                            e.target.parentElement.parentElement.parentElement.remove();
                            mostrarNotificacion("Se borro correctamente", 'correcto');
                            numeroContactos()
                        }else{
                            mostrarNotificacion("Hubo un error", 'error');
                        }
                    }
                }

                xhr.send();
            }
            
        }
    }

    function editarContacto(datos){

        var xhr = new XMLHttpRequest(); 

        xhr.open('POST','./includes/modelos/modelos-contacto.php', true);

        xhr.onload = function(){
            if( this.status === 200){
                const respuesta = JSON.parse(xhr.responseText);
                    mostrarNotificacion('Registro modificado correctamente','correcto');
                    setTimeout(() => {
                        window.location.href = 'index.php';
                    },3500);
            }
        }
        xhr.send(datos)
    }

    function buscarContactos(e){
        const busqueda = new RegExp(e.target.value);
        const contactos = document.querySelectorAll('tbody tr');

        contactos.forEach( contacto =>{
            contacto.style.display = 'none';

            if(contacto.childNodes[1].textContent.replace(/\s/g," ").search(busqueda) != -1){
                contacto.style.display = 'table-row';
            }
            numeroContactos()
        })
    }


    function numeroContactos(){
        const contactos = document.querySelectorAll('tbody tr');
        const totalContactos = document.querySelector('.contador-contactos');
        var total = 0;

        contactos.forEach(contacto => {
            if(contacto.style.display === '' || contacto.style.display === 'table-row' ){
                total++;
            }
        } );

        totalContactos.textContent = total;
    

    }
























})()