const express = require('express');
const app = express();
const routes = require('./routes');
const ExpressError = require('./expressError');

app.use(express.json());
app.use('/items', routes);

app.use(function (req, res, next) {
  return new ExpressError('Not Found', 404);
});

// generic error handler
app.use((err, req, res, next) => {
  let status = err.status || 500;
  return res.status(status).json({
    error: {
      message: err.message,
      status: status,
    },
  });
});

module.exports = app;
