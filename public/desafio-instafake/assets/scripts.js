document.getElementById("js-form").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const email = document.getElementById("input-email").value;
    const password = document.getElementById("input-password").value;
    const JWT = await tokenData(email, password);
    getPhotos(JWT);
  });
  
// llama a la api para recibir token  
  const tokenData = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        });
        const { token } = await response.json();
        localStorage.setItem("jwt-token", token);  
        return token;
    } 
        catch (error) {
          console.log("error", error);
        }
  };
  
  let numeroDePagina = 1;

  const getPhotos = async (JWT) => {
    try {
      const response = await fetch(`http://localhost:3000/api/photos?page=${numeroDePagina}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      });

      const { data } = await response.json();
      console.log(data);
      if (data) {        
        fillInformation(data, "infoParaLlenar");
        
          if (numeroDePagina== 1) {
            toglecerrarSesion("cerrarSesion");
            togleMas("botonMas");
            toogleFormularioYTabla("input_email", "infoParaLlenar");//esconde el formulario y muestra los datos
          } 
      }
    } 
      catch (error) {
        localStorage.clear();
        console.log("Error", error);
      }
  };
  
  const fillInformation = (data, id) => {
    const dataTemplate = document.getElementById(id);
  
    data.forEach((elem) => {
      dataTemplate.innerHTML += `     
      <div style="border: 1px solid #8f8f8f">
        <img src= ${elem.download_url} class="img-fluid mx-auto my-auto" style="align-items: center"/>
        <p style="font-size: 12px; margin-top: 15px; margin-left: 10px"> Author: ${elem.author}</p>
      </div>   
    <br>`;
    });
  };
  
  //esconde el formulario, botones de cerrar sesion y cargar mas imagenes
  
  const toogleFormularioYTabla = (form, table) => {
    $(`#${form}`).toggle();
    $(`#${table}`).toggle();
  };
  
   const toglecerrarSesion = (cerrarSesion) => {
     $(`#${cerrarSesion}`).toggle();
   };

   const togleMas = (botonMas) => {
    $(`#${botonMas}`).toggle();
   };

   $("#botonMas").on("click", () => {
     numeroDePagina++;
     const token = localStorage.getItem("jwt-token");
     getPhotos(token);
   });
    
  const init = async () => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      getPhotos(token);
    }
  };
  
  init();
  
  // cerrar sesion
  
  document.getElementById("cerrarSesion").addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
