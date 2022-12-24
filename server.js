const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const path = require('path')
app.use(express.json());
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoute');
const clinicRoute = require('./routes/clinicRoute');

const User = require('./models/userModel.js');

// Use middleware --> app.use()
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/clinic', clinicRoute);
      
// Serving static files
app.use(express.static(__dirname + '/public'));

app.use("/", express.static(path.join(__dirname, "client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
