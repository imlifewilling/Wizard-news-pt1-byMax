const postDetails = (post) => {
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
        `;
  return html;
};

module.exports = postDetails