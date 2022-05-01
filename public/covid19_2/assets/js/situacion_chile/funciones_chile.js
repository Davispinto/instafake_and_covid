function validation(JWT, form, obj) {
  if (JWT != undefined) {
    // muestra u oculta modal de inicio de sesion
    SetBlockAndNone(obj);
    $("#myModal").modal("hide");
    return true;
  } else {//alerta para usuario no resgistrado y reset para limpiarlo 
    form.reset();
    alert("Usuario no registrado");
    return false;
  }
}

// validar si existe token para mostar informacion
const init = (obj) => {
  const token = localStorage.getItem("jwt-token");
  if (token) {
    SetBlockAndNone(obj);
  }
};

// display block y none despues de la validacion
function SetBlockAndNone(obj) {
  Array.from(obj).forEach((x, i) => {
    if (x.innerHTML.includes("Iniciar Sesion")) {
      x.classList.toggle("luegoDeValidarOculta");
    } else if (x.innerHTML.includes("Situacion Chile")) {
      x.classList.toggle("luegoDeValidarOculta");
    } else if (x.innerHTML.includes("Cerrar Sesion")) {
      x.classList.toggle("luegoDeValidarOculta");
    }
  });
}

// esconde elementos del dom, post validation usuario
function luegoDeValidarEsconder(obj) {
  Array.from(obj).forEach((x) => {
    x.classList.toggle("luegoDeValidarOculta");
  });
}

// transforma data en datapoints para grafico con label y:, x:
function toDataPoints(data) {
  const info = data.map((label) => {
    return { x: new Date(label.date), y: label.total };
  });
  return info;
}

export { validation, init, luegoDeValidarEsconder, toDataPoints };