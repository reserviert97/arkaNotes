require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

// Routes
const noteRouter = require('./routes/note');
const categoryRouter = require('./routes/category');

const app = express();

const whitelist = ['http://192.168.6.180', 'http://192.168.100.22'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}
app.use(cors());

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Routing
app.use('/notes', noteRouter);
app.use('/category', categoryRouter);

app.listen(process.env.PORT || 3000);