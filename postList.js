const postBank = require('./postBank')

const postList = (arr) => {
    const html = ` <!DOCTYPE html>
      <html>
          <title>Wizard News</title>
          <link rel = "stylesheet" href = "/style.css" />
        </head>
        <body>
          <div class = 'news-list'>
            <header><img src = '/logo.png'>Wizard News</header>
            ${
              arr.map(
                (post) => `
                  <div class = 'news-item'>
                    <p>
                      <span class="news-position">${post.id}. ▲</span><a href='/posts/${post.id}'>${post.title}</a>
                      <small>(by ${post.name})</small>
                    </p>
                    <small class="news-info">
                      ${post.upvotes} upvotes | ${postBank.msToTime(post.date.getTime())}
                    </small>
                  </div>`
              ).join(' ')
            }
          </div>
        </body>
      </html>
      `
    return html;
}

module.exports = postList;