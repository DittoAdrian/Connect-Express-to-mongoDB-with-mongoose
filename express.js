const path = require('path')
const mongoose = require('mongoose')
const express = require('express');
const app = express()

mongoose.connect('mongodb://127.0.0.1/shop_db')
.then(()=>{
    console.log('conected to mongodb database')
}).catch((error)=>{
    console.log('error',error)
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')


app.get('/',(req,res)=>{
    res.send('Hallo Dunia')
})




app.listen(3000,()=>{
    console.log('listening to port http://127.0.0.1:3000')
})