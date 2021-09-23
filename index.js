const express = require('express')
const app = express()
app.use(express.json()) // 데이터 가공용도
app.use(express.urlencoded({extended: true}));
const port = 3000

const connect = require('./schemas');
connect();

// const goodsRouter = require('./routes/goods');
// const userRouter = require('./routes/user');

const goodsRouter = require("./routers/goods");
app.use("/api", [goodsRouter]);

app.use(express.urlencoded({extended: false})) //데이터 가공용도
app.use(express.static('public')); //정적 파일 제공용도

app.set('views', __dirname + '/views'); // view의 경로
app.set('view engine', 'ejs'); //ejs를 사용하겠다 선언

app.get('/test', (req, res) => {
  let name = req.query.name; // 쿼리 : url에서 뒤의 내용을 붙인다 ?name=000
  res.render('test', {name});
})

// app.use('/goods', goodsRouter);
// app.use('/user', userRouter);

app.use((req, res, next) => {
    console.log(req);
    next();
});

app.get('/', (req, res) => {
res.send('<!DOCTYPE html>\
    <html lang="en">\
    <head>\
        <meta charset="UTF-8">\
        <meta http-equiv="X-UA-Compatible" content="IE=edge">\
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\
        <title>Document</title>\
    </head>\
    <body>\
        Hi. I am with html<br>\
        <a href="/hi">Say Hi!</a>\
    </body>\
    </html>')
})

app.get('/home', (req, res) => {
  res.render('index');
})

app.get('/detail', (req, res) => {
  let goodsId = req.query.name; // 쿼리 : url에서 뒤의 내용을 붙인다 ?name=000
  res.render('detail', {goodsId});
})

app.get('/cart', (req, res) => {
  res.render('cart');
})

app.get('/order', (req, res) => {
  res.render('order');
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
});