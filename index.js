const app = require('express')();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./routes');

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('dev'));
app.use('/', router);

app.get('/', (req, res) => {
    res.send('Welcome to the Social Network API. It is a Work in Progress')
});

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});