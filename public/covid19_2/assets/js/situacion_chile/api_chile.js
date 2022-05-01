// solicitar jwt para validar usuario
const postData = async (email, password) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    });

    const { token } = await response.json();
    localStorage.setItem("jwt-token", token);
    if (token) {
      $("#btnIniciar").css("display", "none");
      $("#btnSituacion").css("display", "block");
      $("#btnCerrar").css("display", "block");
    }
    return token;
  } catch (error) {
    console.log("error", err);
  }
};

const dataCovidPaisConfirmed = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/confirmed", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const dataCovidPaisDeaths = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/deaths", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

const dataCovidPaisRecovered = async (jwt) => {
  try {
    const response = await fetch("http://localhost:3000/api/recovered", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const { data } = await response.json();
    return data;
  } catch (err) {
    console.log("error", err);
  }
};

export { postData, dataCovidPaisConfirmed, dataCovidPaisDeaths, dataCovidPaisRecovered, };
