//  llenado de la tabla

function fillInformation(data, id) {
    const dataTemplate = document.getElementById(id);
    dataTemplate.innerHTML = `
      <tr>
        <th>Pais</th>
        <th>Casos Activos</th>
        <th>Casos Confirmados</th>
        <th>Casos Muertos</th>
        <th>Casos Recuperados</th>
        <th>Detalles</th>
      </tr>
   `;

   data.forEach((row, i) => {
      dataTemplate.innerHTML += `
      <tr>
        <td>${row.location}</td>
        <td>${new Intl.NumberFormat().format(row.active)}</td>
        <td>${new Intl.NumberFormat().format(row.confirmed)}</td>
        <td>${new Intl.NumberFormat().format(row.deaths)}</td>
        <td>${new Intl.NumberFormat().format(row.recovered)}</td>
        <td>
          <a class="openModal" onclick="detailsModal(${i})" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Ver detalle
          </a>
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
              <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Informacion estadistica del Covid</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
          <div id="modalInfo" class="modal-body">
          <div id="chartContainer2" style="height: 200px; width: 100%; margin: 0 auto"></div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
        </div>
      </div>
    </div>
  </div></td>
    </tr>`;
    });
  }
  
  function fillGrafico(data, id, grafico) {
    const dataModal = document.getElementById(id);
    dataModal.innerHTML = "";
    data.forEach((pais) => {
      dataModal.innerHTML = pais;
    });
  }
  
  /* filtrado casos activos de covid19 paises para el grafico principal */
  
  function casosActivos(info, num) {
    const filtroCasosActivos = info.filter((paises) => paises.confirmed > num);
    return filtroCasosActivos;
  }
  
  /* contenido del grafico detalle mostrar todo con el .map */
  function graficoDetalle(id) {
    var todo = document.querySelectorAll(id);
      return [].map.call(todo, function (t) {
      return t.textContent;
      });
  }
  
  export { fillInformation, casosActivos, fillGrafico, graficoDetalle };