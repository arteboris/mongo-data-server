const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const mainRouter = require('./main/main');
const carRouter = require('./car/car');
const usersRouter = require('./users/users.router');
const productsRouter = require('./products/products.router');

init();

async function init () {
    const app = express();

    await conectToDb(config);

    initMiddleware(app);
    initRouters(app);

    app.listen(config.port);
};

function initMiddleware(app) {
    app.use(bodyParser.json());
    app.use(cors());
};

function initRouters(app){
    app.use('/', mainRouter);
    app.use('/car', carRouter);
    app.use('/users', usersRouter);
    app.use('/products', productsRouter);
    app.use('/*', (req, res, next) => {
        res.status(404).json('SmartBin: Invalid URL')
      });
};

async function conectToDb(config){    
    try {
        const url = config.mongodb_url;
        await mongoose.connect(url,
            { useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
    } catch(err) {
        return next(err);
    };
};