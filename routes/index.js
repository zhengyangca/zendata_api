var express = require("express");
var router = express.Router();
var { getCORRA, getCPI } = require("../datasource/bank_of_canada.js");
var { getGCEconIndicators } = require("../datasource/gc.js");
var { getMetalPrice} = require("../datasource/goldAPI.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET users listing. */
router.get("/users", function (req, res, next) {
  res.send("respond with a resource");
});

/* GET current CORRA */
router.get("/corra", async function (req, res, next) {
  const { query } = req;
  const corra = await getCORRA(parseInt(query.recent));
  res.send(corra);
});

/* GET current CPI */
router.get("/cpi", async function (req, res, next) {
  const { query } = req;
  const cpi = await getCPI(parseInt(query.recent));
  res.send(cpi);
});

/* GET metal price */
router.get("/metal", async function (req, res, next) {
  const { query } = req;
  const { metalCode, currency } = query;
  const metalPrice = await getMetalPrice(metalCode, currency);
  res.send(metalPrice);
});

router.get("/gc-econ-titles", async function (req, res, next) {
  const data = await getGCEconIndicators();
  const result = [];
  data.indicators.forEach((indicator) => {
    const { geo_code, title } = indicator;
    const titleEn = title.en;
    result.push({ geo_code, titleEn });
  });
  res.send(result);
});

router.get("/gc-econ", async function (req, res, next) {
  const { geo_code:geoQuery } = req.query;
  const data = await getGCEconIndicators();
  const result = [];
  data.indicators.forEach((indicator) => {
    const { geo_code, title, value, refper, growth_rate } = indicator;
    if (geo_code === parseInt(geoQuery)) {
      const titleEn = title.en;
      const valueEn = value.en;
      const refperEn = refper.en;
      const growth_rateEn = growth_rate ? growth_rate.growth.en : null;
      const growth_detailsEn = growth_rate ? growth_rate.details.en : null;
      result.push({ geo_code, titleEn, valueEn, refperEn, growth_rateEn, growth_detailsEn });
    }
  });
  res.send(result);
});

module.exports = router;
