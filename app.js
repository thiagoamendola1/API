    const express = require('express');
    const app = express();
    const morgan = require('morgan');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');

    const vereadoresRoutes = require('./api/routes/vereadores')
    const gastosRoutes = require('./api/routes/gastos')
    
    mongoose.connect('mongodb+srv://thiagoamendola:'+ 
    'governoaberto'+ 
    '@cluster0-gh5xj.mongodb.net/test?retryWrites=true&w=majority',{
        useNewUrlParser :true,
        useUnifiedTopology: true
    });

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

    app.use((req,res,next) => {
        res.header("Access-Control-Allow-Origin","*")
        res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Autorization"
        );
        if(req.method==='OPTIONS'){
            res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE,GET');
            return res.status(200).json({});
        }   
        next();
    });

    //rotas
    app.use('/vereadores',vereadoresRoutes);
    app.use('/gastos',gastosRoutes);

    app.use((req,res,next) =>{
        const error = new Error('Not Found');
        error.status=404;
        next(error);
    })

    app.use((error,req,res,next)=>{
        res.status(error.status || 500);
        res.json({
            error:{
                message: error.message
            }
        });
    });

    module.exports = app;
