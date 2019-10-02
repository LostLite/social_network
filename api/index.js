const app = require('express')();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = 3000;
const router = require('./routes/');

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//routes
app.use('api/', router);
app.use('/', (req, res) => {
    res.send('Welcome to the api home page.')
});

app.listen(3000, () => {
    console.log(`App listening on port ${PORT}`);
});