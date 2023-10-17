const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { sequelize } = require('./model');

const userRoutes = require("./routes/user");
const companyRoutes = require("./routes/company");
const jobOpeningRoutes = require("./routes/jobOpening");
const jobApplicationRoutes = require('./routes/jobApplication');

const app = express();
app.set('port', process.env.PORT || 8001);

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", companyRoutes);
app.use("/api", jobOpeningRoutes);
app.use("/api", jobApplicationRoutes);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});