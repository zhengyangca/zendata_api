const axios = require("axios");

/**
 *  GET GC Econ Indicators from StatCan
 * */
const getGCEconIndicators = async () => {
  const url =
    "https://statcan-economic-indicators-statcan-apicast-production.api.canada.ca/v1/ind-econ.json";
  const response = await axios.get(url, {
    headers: {
      "user-key": "61cfc988ef902983fe62ff315e529cf8",
    },
  });
  return response.data.results;
};

module.exports = {
  getGCEconIndicators,
};
