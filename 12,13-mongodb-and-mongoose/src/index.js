require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const api = require('./api');

mongoose.Promise = global.Promise;
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true },
  )
  .then(() => {
    console.log('Connected to mongodb');
  });

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes());

// 라우터를 앱에 적용
app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.env.PORT, () => {
  console.log(`Server is listening to port ${process.env.PORT}`);
});
