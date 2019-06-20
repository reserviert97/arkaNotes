const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

// Routes
const noteRouter = require('./routes/note');
const categoryRouter = require('./routes/category');

const app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Routing
app.use('/note', noteRouter);
app.use('/category', categoryRouter);

app.listen(process.env.PORT || 3000);