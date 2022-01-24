var AWSXRay = require("aws-xray-sdk-core");
AWSXRay.captureHTTPsGlobal(require("http"));
AWSXRay.captureHTTPsGlobal(require("https"));
AWSXRay.capturePromise();

var xrayExpress = require("aws-xray-sdk-express");
var express = require("express");
var app = express();
var axios = require("axios");

app.use(xrayExpress.openSegment("eventSVC"));

app.get("/some-endpoint", function (req, res) {
  const options = {
    url: "http://localhost:8080/",
    method: "POST",
    data: getLargeData(),
    timeout: 3000,
  };

  return axios
    .request(options)
    .then(() => {
      res.send({ status: true });
    })
    .catch(() => {
      res.send({ status: false });
    });
});

app.use(xrayExpress.closeSegment());

app.listen(8000, () => {
  console.log("STARTED");
});

const getLargeData = () => {
  const arr = [];
  for (let i = 0; i < 10000; i++) {
    arr.push(i);
  }

  return arr;
};
