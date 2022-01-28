const express = require("express");
const axios = require("axios");


const app = express();


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// GET requestToken
app.get("/requesttoken", (req, res) => {
  axios
    .get("http://api.pixlpark.com/oauth/requesttoken")
    .then((data) => res.send(data.data));
});

// GET accessToken
app.get("/accesstoken", (req, res) => {
  const crypto = require("crypto");
  const shaPassword = crypto
    .createHash("sha1")
    .update(req.query.requestToken + req.query.password)
    .digest("hex");
  const params = {
    oauth_token: req.query.requestToken,
    grant_type: "api",
    username: req.query.username,
    password: shaPassword,
  };
  axios
    .get("http://api.pixlpark.com/oauth/accesstoken", {
      params,
    })
    .then((data) => {
      res.send(data.data);
    });
});
// GET Orders
app.get("/orders", (req, res) => {
  const params = {
    oauth_token: req.query.accessToken,
    take: req.query.take,
    status: req.query.status
  };
  axios
    .get("http://api.pixlpark.com/orders", {
      params,
    })
    .then((data) => res.send(data.data));
});

// GET Orders count
app.get("/orders/count", (req, res) => {
  const params = {
    oauth_token: req.query.accessToken,
    statuses: req.query.statuses
  };
  axios
    .get("http://api.pixlpark.com/orders/count", {
      params,
    })
    .then((data) => res.send(data.data));
});
// GET Orders by id
app.get(`/orders/:id`, (req, res) => {
  const params = {
    oauth_token: req.query.accessToken,
  };
  axios
    .get(`http://api.pixlpark.com/orders/${req.params.id}`, {
      params,
    })
    .then((data) => res.send(data.data));
});

app.listen(5000);
