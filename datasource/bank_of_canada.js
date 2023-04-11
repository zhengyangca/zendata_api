const axios = require("axios");

/**
 *  GET CORRA (Overnight Repo Rate Averate) from Bank of Canada
 * */
const getCORRA = async (recent) => {
  recent = recent || 50;
  const url =
    "https://www.bankofcanada.ca/valet/observations/group/CORRA/json?recent=" +
    recent;
  const response = await axios.get(url);
  const data = response.data.observations;
  const corra = await collectRencentCORRA(data);
  return corra;
};

const collectRencentCORRA = async (corraData) => {
  const recentCORRA = [];
  corraData.forEach((corra) => {
    const date = corra.d;
    const value = corra["AVG.INTWO"].v;
    if (value !== recentCORRA[recentCORRA.length - 1]?.value) {
      recentCORRA.push({ date, value });
    }
  });
  return recentCORRA;
};
/**
 * GET CPI_COMMON from Bank of Canada
 */
const getCPI = async (recent) => {
  recent = recent || 10;
  const url =
    "https://www.bankofcanada.ca/valet/observations/group/CPI_MONTHLY/json?recent=" +
    recent;
  const response = await axios.get(url);
  const data = response.data.observations;
  const cpi = await collectRencentCPI(data);
  return cpi;
};
const collectRencentCPI = async (cpiData) => {
  const recentCPI = [];
  cpiData.forEach((cpi) => {
    const date = cpi.d;
    const value = cpi.CPI_COMMON.v;
    recentCPI.push({ date, value });
  });
  return recentCPI;
};

module.exports = {
  getCORRA,
  getCPI,
};
