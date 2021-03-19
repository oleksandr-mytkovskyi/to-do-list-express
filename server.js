const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const winston = require("./app/utils/logger");
const errorMiddleware = require('./app/middleware/error.middleware');
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to crud application" });
});

require("./app/routes/list.routes")(app);
require("./app/routes/user.routes")(app);

app.use(errorMiddleware);


// помилки в промісах
process.on('unhandledRejection', (reason, promise) => {
  winston.logger.log('error', reason);
});
process.on('rejectionHandled', (promise) => {
  winston.logger.log('error', promise);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  winston.logger.info(`Server is running on port ${PORT}.`);
});