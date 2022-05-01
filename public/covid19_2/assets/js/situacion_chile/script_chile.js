import { postData, dataCovidPaisConfirmed, dataCovidPaisDeaths, dataCovidPaisRecovered,} from "./api_chile.js";
import { validation, init, luegoDeValidarEsconder, toDataPoints, } from "./funciones_chile.js";

// capturando login info, recibiendo y guardando jwt
const form = document.getElementById("js-form");
// elementos para post validacion token
const postValidation = document.getElementsByClassName("luegoDeValidar");

// accediendo al evento submit y validando usuario
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  // accediendo a los datos del usuario
  const email = document.getElementById("js-input-email").value;
  const password = document.getElementById("js-input-password").value;
  const JWT = await postData(email, password);
  
  // valida usuario, si existe en base de datos, esconde y agrega element al dom
  const validationUser = validation(JWT, form, postValidation);  
  if (validationUser) {
  } else {
    console.log("Usuario sin permisos");
  }
});

// valida si existe token en localstorage, si existe, esconde elementos del menu
init(postValidation);

// cargar datos desde api, para tenerlos listos al desplegar grafico

document.getElementById("btnSituacion").addEventListener("click", () => {
  setTimeout(async () => {
  const token = localStorage.getItem("jwt-token");
  $(".seccionMundial").css("display", "none");
  $("#seccionChile").css("display", "block");
  const confirmed = await dataCovidPaisConfirmed(token);
  const datapointsConfirmed = toDataPoints(confirmed);
  const deaths = await dataCovidPaisDeaths(token);
  const datapointsDeaths = toDataPoints(deaths);
  const recovered = await dataCovidPaisRecovered(token);
  const datapointsRecovered = toDataPoints(recovered);

  
  Promise.all([confirmed, deaths, recovered])
    .then(graficoChile(datapointsConfirmed, datapointsDeaths, datapointsRecovered))
}, 1000);
});

document.getElementById("btnHome").addEventListener("click", () => {
  $(".seccionMundial").css("display", "block");
  $("#seccionChile").css("display", "none");
});

// borra jwt token y recarga todo el sitio
document.getElementById("CerrarSesion").addEventListener("click", () => {
  localStorage.clear();
  $(".seccionMundial").css("display", "block");
  $("#seccionChile").css("display", "none");
  $("#btnIniciar").css("display", "block");
  $("#btnSituacion").css("display", "none");
  $("#btnCerrar").css("display", "none");
});

// config grafico situacion chile
async function graficoChile(confirmed, deaths, recovered) {
  var chart3 = new CanvasJS.Chart("chartContainer3", {
    title: {
      text: "Covid19 - Chile",
    },

    axisX: {
      valueFormatString: "DD MM YYYY",
      tittle: "dias/mes/año",
    },

    axisY2: {
      title: "Recuperados",
    },

    axisY: {
      title: "Confirmados",
    },

    toolTip: {
      shared: true,
    },

    legend: {
      cursor: "pointer",
      verticalAlign: "top",
      horizontalAlign: "center",
      dockInsidePlotArea: true,
      itemclick: toogleDataSeries,
    },

    data: [
      {
        type: "line",
       // axisYType: "secondary",       
        color: "#e8d900",
        name: "Confirmados",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "#,### Personas",
        dataPoints: confirmed,
      },
      {
        type: "line",
        axisYType: "secondary",
        color: "#a6a6a6",        
        name: "Muertes",
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "#,### Personas",
        dataPoints: deaths,
      },
      {
        type: "line",
        axisYType: "secondary",
        name: "Recuperados",
        color: "#009e89", 
        showInLegend: true,
        markerSize: 0,
        yValueFormatString: "#,### Personas",
        dataPoints: recovered,
      },
    ],
  });
  chart3.render();

  function toogleDataSeries(e) {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart3.render();
  }
}