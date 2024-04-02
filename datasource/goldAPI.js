const axios = require("axios");
const { goldAPIKey } = require("../config");

/**
 * GET Metal price
 */
const getMetalPrice = async (metal, currency) => {
  const url =
    "https://www.goldapi.io/api/" + metal + "/" + currency;

  var myHeaders = new Headers();
  myHeaders.append("x-access-token", goldAPIKey);
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);
  return response.text();
};

module.exports = {
  getMetalPrice,
};
