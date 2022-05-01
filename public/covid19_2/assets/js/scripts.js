import { apiData, dataPaises } from "./api.js";
import { fillInformation, casosActivos, graficoDetalle } from "./funciones.js";

  //  grafico principal 
async function graphCanvas() {
  // casos covid de paises
  const responseData = await apiData();
  const covidData = responseData;

  // filtro aplicado a la data para uso en grafico
  const covidConfirmados = casosActivos(covidData, 10000);

  // mapeando paises y casos para mostrar en el grafico
  const dataPoints = covidConfirmados.map((label) => {
    return { label: label.location, y: label.confirmed };
  });

  const dataReco = covidConfirmados.map((label) => {
    return { label: label.location, y: label.recovered };
  });

  const dataMuertos = covidConfirmados.map((label) => {
    return { label: label.location, y: label.deaths };
  });
  
  const dataActivos = covidConfirmados.map((label) => {
    return { label: label.location, y: label.active };
  });
  
    var chart1 = new CanvasJS.Chart("chartContainer1", {
   
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Paises con Covid19",
    },
    
    axisX: {
    // labelFontSize: 0,
    },
    axisY: {
      labelFontSize: 14,
      titleFontSize: 24,
      titleFontColor: "#000000",
      lineColor: "#000000",
      labelFontColor: "#000000",
      tickColor: "#000000",
      includeZero: true,
    },
    toolTip: {
      shared: true,
    },

    legend: {
      verticalAlign: "top",
      cursor: "pointer",
      itemclick: toggleDataSeries,
    },

    data: [
            {
              color: "#ba0003",
              type: "column",
              name: "Confirmados",
              showInLegend: true,
              dataPoints: dataPoints,
            },      

            {
              color: "#d9ca00",
              type: "column",
              name: "Recuperados",
              axisYType: "secondary",
              showInLegend: true,
              dataPoints: dataReco,
            },  
            
            {
              color: "#002a8c",
              type: "column",
              name: "Muertos",
              axisYType: "secondary",
              showInLegend: true,
              dataPoints: dataMuertos,
            },  

            {
              color: "#966c00",
              type: "column",
              name: "Activos",
              axisYType: "secondary",
              showInLegend: true,
              dataPoints: dataActivos,
            },  
          ],
  });
  chart1.render();

  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    e.chart.render();
  }
  // fin grafico principal

  // llenado tabla

  fillInformation(covidData, "tablaDeDatos");
}

graphCanvas();

//grafico detalle
async function modalGraph(data, pais) {
  var chart2 = new CanvasJS.Chart("chartContainer2", {
    animationEnabled: true,
    title: {
      text: `Covid en ${pais}`,
    },
    data: [
      {
        type: "pie",
        startAngle: 240,
        indexLabel: "{label} {y}",
        dataPoints: [
          { y: data.confirmed, label: "Confirmados:" },
          { y: data.deaths, label: "Muertos:" },
          { y: data.recovered, label: "Recuperados:" },
          { y: data.active, label: "Activos:" },
        ],
      },
    ],
  });
  chart2.render();
}
 
window.detailsModal = async (i) => {
  const nombreDePaises = graficoDetalle("tbody>tr>td:first-child");
  const responseData = await dataPaises(nombreDePaises[i]);
  modalGraph(responseData, nombreDePaises[i]);
};