const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');

const app = express();

require('dotenv').config();
require('./config/database');

/* --- MOUNT logging and middleware --- */
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

/* --- API routes --- */
app.use('/api/users', require('./routes/api/users'));
app.use('/api/gratitude/:userId', require('./routes/api/gratitude'));
// app.use('/api/wellness', require('./routes/api/wellness'));
// app.use('/api/meetings', require('./routes/api/meetings'));
// app.use('/api/task', require('./routes/api/task'));
// app.use('/api/mantra', require('./routes/api/mantra'));


// app.use(require('./config/auth'));

/* --- Catch all --- */
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});