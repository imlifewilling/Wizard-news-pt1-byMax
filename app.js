const express = require('express');
const app = express();
const morgan = require('morgan')
const postBank = require('./postBank')
const postList = require('./postList')
const postDetails = require('./postDetails')
// const post = postBank.list().map((item) => {
//   return [item.title, item.name].join()
// })
// console.log(post)

// const Data = postBank.list()
// const Date = Data.map((item) => postBank.msToTime(item.date.getTime()))
// console.log(Date)

app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'));


app.get('/posts/:id', (req, res, next) => {
  const id = req.params.id
  const post = postBank.find(id*1)
  if (!post.id) {
    // If the post wasn't found, set the HTTP status to 404 and send Not Found HTML
    res.status(404)
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <header><img src="/logo.png"/>Wizard News</header>
      <div class="not-found">
        <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
        <img src="/dumbledore-404.gif" />
      </div>
    </body>
    </html>`
    res.send(html)
  } 
  next();
})

app.get('/', (rep, res) => {
  const posts = postBank.list();
  res.send(postList(posts));
})

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id*1);
res.send(postDetails(post))

})

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

