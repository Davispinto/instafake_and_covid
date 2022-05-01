const urlApiCovid = "http://localhost:3000/api/total";

const apiData = async () => {
  try {
    // peticion api
    const response = await fetch(urlApiCovid, {
      method: "GET",
    });
    if (response) {
      const { data } = await response.json();
      return data;
    } 
  } catch (err) {
    console.log("Error", err);
  }
};

const dataPaises = async (country) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/countries/${country}`,
      {
        method: "GET",
      }
    );
    if (response) {
      const { data } = await response.json();
      return data;
    } 
  } catch (err) {
    console.log("Error", err);
  }
};

export { apiData, dataPaises };