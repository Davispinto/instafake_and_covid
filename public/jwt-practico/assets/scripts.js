/*
------------------- Ejercicio guiado - Aplicando JWT
Realizar una interfaz web con HTML, JavaScript y jQuery
que nos permite iniciar sesión (obtener el JWT) y 
acceder a los posts de un usuario.

-- Obtener el JWT a través de un formulario

Identificando pasos:

● 1.- Darles ids o nombres para identificar los elementos del formulario que
necesitaremos manipular.
● 2.- Capturar el evento submit del formulario.
● 3.- En el evento submit obtener los valores de email y password ingresados.
● 4.- Crear un llamado al endpoint de login http://localhost:3000/api/login
*/

//1.- Darles ids o nombres para identificar los elementos del formulario que
//necesitaremos manipular.
//jwt-email - jwt-password - jwt-formulario


//2.- Capturar el evento submit del formulario.
// 3.- En el evento submit obtener los valores de email y password ingresados.

$('#jwt-formulario').submit(async (event)=>{
    event.preventDefault();

    const email = document.getElementById("jwt-email").value;
    const password = document.getElementById("jwt-password").value;

    const JWT = await postData(email, password);
    if(JWT){
        getPosts(JWT);
    }
    
    // const resultado = await getPosts(JWT);
    // llenadoTabla(resultado, "jwt-tabla-post");
    // toggleFormularioTabla('jwt-div-form', 'jwt-div-tabla');

});

//4.- Crear un llamado al endpoint de login http://localhost:3000/api/login

const postData = async (emailIng, passwordIng) => {
    try{
        const response = await fetch('http://localhost:3000/api/login',{
            method: 'POST',
            body: JSON.stringify({email: emailIng, password : passwordIng})
        });
        const {token} = await response.json();
        localStorage.setItem('jwt-token',token);
        return token; 
    }catch(e){
        console.log(`Error: ${e}`);
    };
};

/*
// -- Usar JWT para obtener datos de la API
● 1.- Crear identificadores para manipular el html de la tabla.
● 2.- Crear una función que revisa el JWT y haga el llamado a la API de posts.
● 3.- Completar la tabla con los datos que vienen de la API.
● 4.- Ocultar el formulario y mostrar la tabla.
*/
//Codificar solución según los pasos de las tareas identificados:
//1.- Crear identificadores para manipular el html de la tabla.
// jwt-div-tabla - jwt-tabla-post

//2.- Crear una función que revisa el JWT y haga el llamado a la API de posts.

const getPosts = async (jwt) => {
    try{
        const response = await fetch('http://localhost:3000/api/posts',
        {
           method: 'GET',
           headers: {
                Authorization: `Bearer ${jwt}`
           }
        })

        const {data} = await response.json();
        if(data){
            toggleFormularioTabla('jwt-div-form', 'jwt-div-tabla');
            llenadoTabla(data, "jwt-tabla-post");
        }
        // return data;
    }catch(error){
        console.log(`Error: ${error}`);
    };
};

//3.- Completar la tabla con los datos que vienen de la API.

const llenadoTabla = (datos, tabla) => {
    let filas = "";
    //$.each(param1, (indice, datosElementos)=>{});
    $.each(datos, (indice, elemento)=>{
        //filas = filas + "El contenido a agregar";
        //filas = 1234;
        //filas = filas + "El contenido a agregar";
        //filas = 1234 el contenido a agregar;
        filas += `<tr>
            <td> ${elemento.title} </td>
            <td> ${elemento.body} </td>
            </tr>`;
    });
    $(`#${tabla} tbody` ).append(filas);
};

//4.- Ocultar el formulario y mostrar la tabla.
//4.1.- Añadir un identificador al div que encierra el formulario
// jwt-div-form

const toggleFormularioTabla = (formulario, tabla) => {
    $(`#${formulario}`).toggle();
    $(`#${tabla}`).toggle();
};

/*
-- Persistir JWT
Para cumplir el objetivo, utilizaremos LocalStorage

Identificar las pequeñas tareas que hay que realizar:

● 1.- Guardar el JWT, luego de hacer el login en el localStorage.
● 2.- Al momento de cargar nuestra página revisar si existe un JWT, 
    de existir debemos   mostrar la tabla y ocultar el formulario.
*/

/*
Para añadir un valor en el LocalStorage se utiliza la siguiente instrucción:
localStorage.setItem('llave-para-identificar', 'valor-guardado');

Y para acceder al valor guardado del localStorage, se utiliza la siguiente instrucción:

localStorage.getItem('llave-para-identificar');
*/

// 1.- Guardar el JWT, luego de hacer el login en el localStorage.
//localStorage.setItem('jwt-token', token);

(async () => {
    const token = localStorage.getItem('jwt-token');
    if(token){
        // const resultado = await getPosts(token);
        getPosts(token);
    }
})();
