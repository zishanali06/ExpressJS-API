let express = require('express');
let cors = require('cors');
let app = express();
let indexRouter = require('./routes');

app.use(cors());
app.use(express.json());

app.use('/api', indexRouter);

app.listen(3000);