const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Data = require('./models/data');
const Data2 = require('./models/data2');
const { render } = require('ejs');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://ola:ola123456@cluster01.mklew.mongodb.net/DataBase?retryWrites=true&w=majority'
mongoose.connect(dbURI)
.then((result) =>  app.listen(8000), () => {
    console.log('connected on port 8000')
})
.catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// routes 
app.get('/', (req, res) => {    
    res.redirect('/datas');
});

app.get('/about', (req, res) => {    
    res.render('about');
});

// app.get('/students-list', (req, res) => {
//     res.render('student');
// });


app.get('/invoice', (req, res) => {
    res.render('invoice');
});
// expenditure route

app.get('/expenditure', (req, res) => {
    Data2.find().sort({createdAt: -1})
    .then((result) => {
        res.render('expenditure', {datas: result})
    })
    .catch((err) => {
        console.log(err)
    });
});

// create data route
app.get('/datas', (req, res) => {
    Data.find().sort({createdAt: -1})
    .then((result) => {
        res.render('index', {datas: result})
    })
    .catch((err) => {
        console.log(err)
    });
});

app.get('/students-list', (req, res) => {
    Data.find().sort({createdAt: -1})
    .then((result) => {
        res.render('student', {datas: result})
    })
    .catch((err) => {
        console.log(err)
    });
});

// STUDENT POST REQUEST

app.post('/datas', (req, res) => {
    const coursePrice = 100000;
    const tempData = req.body
    const outstanding = coursePrice - tempData.FEE 
    
    const obj = {
        ...tempData,
        OUTSTANDING: outstanding
    }
    const data = new Data(obj);
    console.log(data)
    data.save()
    .then((result) => {
        res.redirect('/students-list');
    })
    .catch((err) => {
        console.log('this is the error: ', err);
    })
})


// INVOICE POST REQUEST

app.post('/invoice', (req, res) => {

    const tempData = req.body
    const outstanding = tempData.unit  *  tempData.quantity 
    
    const obj = {
        ...tempData,
        total: outstanding
    }

    const data = new Data2(obj)
    console.log(data)
    data.save()
    .then((result) => {
        res.redirect('/expenditure');
    })
    .catch((err) => {
        console.log('this is the error: ', err);
    })
});

// data by id
app.get('/datas/:id', (req, res) => {
    const id = req.params.id;
    Data.findById(id)
    .then(result => {
        res.render('student', {data: result})
    })
    .catch(err => {
        console.log(err);
    });
});

 app.get('/base/create', (req, res) => {
    res.render('base');
 });

// 404 page !!mut always be at the bottom
// app.use((req, res) => {
//     res.status(404).render('404');
// });