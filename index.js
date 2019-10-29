const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const router = require('./routes');
const PORT = process.env.PORT || 3030;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser())
app.use(morgan('dev'));
app.use('/', router);
//Process unauthorised error
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({message:'Unauthorized request. Login to proceed with this action.'});
    }
});


app.get('/', (req, res) => {
    res.send('Welcome to the Social Network API. It is a Work in Progress')
});


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});