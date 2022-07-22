const express = require('express');
const app = express();
const morgan = require('morgan')
const postBank = require('./postBank')

// const post = postBank.list().map((item) => {
//   return [item.title, item.name].join()
// })
// console.log(post)


app.use(express.static('public'))
app.use(morgan('dev'));
app.get('/posts/:id', (req, res, next) => {
  const id = req.params.id
  const post = postBank.find(id)
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
  const html = ` <!DOCTYPE html>
      <html>
          <title>Wizard News</title>
          <link rel = "stylesheet" href = "/style.css" />
        </head>
        <body>
          <div class = 'news-list'>
            <header><img src = '/logo.png'>Wizard News</header>
            ${
              posts.map(
                (post) => `
                  <div class = 'news-item'>
                    <p>
                      <span class="news-position">${post.id}. ▲</span><a href='/posts/${post.id}'>${post.title}</a>
                      <small>(by ${post.name})</small>
                    </p>
                    <small class="news-info">
                      ${post.upvotes} upvotes | ${post.date}
                    </small>
                  </div>`
              ).join(' ')
            }
          </div>
        </body>
      </html>
      `
  res.send(html)
})

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id*1);
  const html = ` <!DOCTYPE html>
    <html>
        <title>Wizard News</title>
        <link rel = "stylesheet" href = "/style.css" />
      </head>
      <body>
        <div class = 'news-info'>
          <header><img src = '/logo.png'>Wizard News</header>
          <p>
            ${post.title}
            <small>(by ${post.name})</small>
          </p>

          <p>
            ${post.content}
          </p>
        </div>
      </body>
    </html>
    `
res.send(html)

})

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
