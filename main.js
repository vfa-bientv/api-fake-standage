const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const queryString = require('query-string');
const middlewares = jsonServer.defaults();
server.listen(5000,'0.0.0.0', () => {
  console.log("Express server listening on port %d in %s mode", server.address().port, server.settings.env);
});
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  }
  if (req.method === 'PATCH') {
    req.body.updatedAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});
router.render = (req, res) => {
  // console.log(res.query);

  const headers = res.getHeaders();
  const totalCountHeaders = headers['x-total-count'];

  // console.log(totalCountHeaders);
  if (req.method === 'GET' && totalCountHeaders) {
    console.log(req);
    const queryParams = queryString.parse(req._parsedUrl.query);
    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 10,
        _totalRows: totalCountHeaders,
      },
    };
    return res.jsonp(result);
  }
  return res.jsonp(res.locals.data);
};
// Use default router
server.use('/api', router);

