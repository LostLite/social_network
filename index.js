const app = require('express')();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fileUpload = require('express-fileupload')
const fs = require('fs');
const cors = require('cors');
const router = require('./routes');
const PORT = process.env.PORT || 3030;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser())
app.use(morgan('dev'));
app.use(fileUpload({
    useTempFiles: true
}));
app.use(cors());
app.use('/', router);
//Process unauthorised error
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({message:'Unauthorized request. Login to proceed with this action.'});
    }
});


app.get('/', (req, res) => {
    fs.readFile('docs/apiDocs.json', (err, data) => {
        if(err) res.status(400).json({error:err});

        const docs = JSON.parse(data);
        res.status(200).json(docs);
    });
});


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});