const express = require("express");
const cors = require("cors");
const winston = require("./utils/logger");
const errorMiddleware = require('./middleware/error.middleware');
const app = express();
const db = require("./models");

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to crud application" });
});

require("./routes/list.routes")(app);
require("./routes/user.routes")(app);

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