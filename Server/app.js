require('dotenv').config();
const express=require('express');
const cors=require('cors');
const path=require('path');
const app=express();
const errorHandler = require(`./helpers/errorHandler`)

module.exports=(PORT)=>{
    app.set('view engine','ejs');

    app.use(express.static(path.join(__dirname,'public')));
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cors());

    app.use(require('./routes/index'));
    app.use(errorHandler)

    app.listen(PORT,()=>console.log('Server jalan di port '+PORT))
}
