const express = require('express');
const indexRouter = require('./routes/index');
const cors = require('cors');

const app = express();
app.use(cors());

app.use('/', indexRouter);

const mode = process.env.mode;

if (mode && mode === 'dev') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
} else {
  exports.cf_api = app;
}


