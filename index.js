const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use((error, req, res, next) => {
  return res.status(500).json({ error: "Improperly Formatted Request" });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

app.listen(PORT, () => console.log("Server is running"));

app.post("/checkout", (req, res) => { 

  console.log("Post Request received");

  // fetching the data field from the body
  let { data } = req.body;

  if (data) {

    // filtering the data using a whitelist method (allowed values only, reject other values)
    // if the value is not an allowed value, it will removed from the array
    const whitelist = ["001", "002", "003", "004"];
    data = data.filter((id) => whitelist.includes(id));

    let results = {};
    let total = 0;

    // counting each objects in the data and assigning them in results as counts
    // example output: { "001": 2, "002": 5 }
    for (var i = 0; i < data.length; i++) {
      results[data[i]] = 1 + (results[data[i]] || 0);
    }

    // calculating price for each watch type
    // if type 1 exists: calculate it
    if (results["001"]) {
      if (results["001"] >= 3) {
        let discounted = ~~(results["001"] / 3);
        let regular = results["001"] % 3;
        total += discounted * 200 + regular * 100;
      } else {
        total += results["001"] * 100;
      }
    }

    // if type 2 exists: calculate it
    if (results["002"]) {
      if (results["002"] >= 2) {
        let discounted = ~~(results["002"] / 2);
        let regular = results["002"] % 2;
        total += discounted * 120 + regular * 80;
      } else {
        total += results["002"] * 80;
      }
    }

    // if type ..
    if (results["003"]) {
      total += results["003"] * 50;
    }
    if (results["004"]) {
      total += results["004"] * 30;
    }

    res.send({
      items: data.length,
      quantities: results,
      price: total,
    })

  } else {
    // return blanks if the data is improper or non-existant
    res.send({
      items: 0,
      quantities: {},
      price: 0
    })
  }
  

  
});