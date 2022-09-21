
const express = require('express');


const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session')
const cookieParser = require("cookie-parser");
const app=express();
const sequelize=require('./dbcon/conn');
var router = require('./route/apiRouter.js');
const Session = require('./models/session');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use('/api',router);

app.set('trust proxy', 1)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to sequelize store
var SequelizeStore = require("connect-session-sequelize")(session.Store);


const time= 1000 * 60 ; // set time for 1 min 
app.use(session({
    secret: 'sessionkey',
    resave: false,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 1 * 60 * 1000,  // 1 min
        expiration: 5*  60 * 1000   //  2 min
      }),
    saveUninitialized: true,
    cookie: { maxAge: time },
    proxy: true,
  }))

  app.get('/api/user/*', (req, res) => {
    if (req.session.views) {
      req.session.views++;
    //   Session.afterUpdate={

    //   }
    }
    else {
      req.session.views = 1;
    }
    res.send(`${req.session.views} views`);
  })


  
  app.use((err, req, res) => {
    console.log(err);
    // res.status(500).json({ status:res,code:500,message:'server error '});
  });
  

  module.exports=app;


