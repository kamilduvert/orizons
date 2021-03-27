require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const router = require('./Back/app/router');

const app = express();

// middlewares
app.use(helmet()) // set http headers
app.use(cors()); // allow request from other websites
app.use(morgan('dev')) // 


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

/*
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

// response to preflight request
if (req.method === 'OPTIONS') {
    res.sendStatus(200);
} else {
    next();
}
});
*/

app.use('/api', router);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on :', process.env.PORT);
});