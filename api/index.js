const app = require('express')();
const morgan = require('morgan');
const PORT = 3000;
const { getPosts } = require('./routes/post');

//middleware
app.use(morgan('dev'));

app.get('/', getPosts);

app.listen(3000, () => {
    console.log(`App listening on port ${PORT}`);
});