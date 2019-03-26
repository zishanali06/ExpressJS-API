let express = require('express');
let cors = request('cors');

let app = express();

app.use(cors());
app.use(express.json());

app.listen(3000);