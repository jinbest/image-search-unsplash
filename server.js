const express = require('express');
const path = require('path');
const port = process.env.PORT || 8001;
const app = express();
const bodyParser = require('body-parser');
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "build"));
app.set("view engine", "html");

app.listen(port, () =>
  console.log(`This project is listening on port ${port}!`)
);
