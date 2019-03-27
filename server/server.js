let express = require('express');
let cors = require('cors');
let app = express();
let path = require('path');
let indexRouter = require('./routes');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', indexRouter);

app.use(express.static(path.join(__dirname, "../client")));

app.listen(3000);