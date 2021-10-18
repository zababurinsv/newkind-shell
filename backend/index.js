import path from "path";
let __dirname = path.dirname(process.argv[1]);
import express from "express";
import cors from "cors";
import Enqueue from "express-enqueue";
import dotenv from "dotenv"
let frontend = __dirname
frontend = frontend.replace('/backend', '/frontend')
dotenv.config()
import whitelist from './whitelist/whitelist.mjs'
let app = express();
app.use(cors({ credentials: true }));
const queue = new Enqueue({
  concurrentWorkers: 4,
  maxSize: 200,
  timeout: 30000
});
app.use(queue.getMiddleware());
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use( express.static(frontend + '/static'));

app.options('/favicon.ico', cors(corsOptions))
app.get('/favicon.ico', async (req, res) => {
  res.sendFile('/favicon.ico', { root: __dirname });
})

app.options('/*', cors(corsOptions))
app.get('/*', async (req, res) => {

  res.sendFile('/src/index.html', { root: frontend });
})

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(queue.getErrorMiddleware())

let port = process.env.PORT || 6776
app.listen(port ,() => {
  console.log('pid: ', process.pid)
  console.log('listening on http://localhost:'+ port);
});