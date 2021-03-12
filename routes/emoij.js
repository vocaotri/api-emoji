var cache = require('memory-cache');
const emoijRoutes = (app, fs) => {
  const dataPath = "./data/emoji.json";
  app.get("/emojis", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Pragma", "no-cache");
      res.header("Expires", 0);
      var key = req.jsonResult
      var cacheBody = cache.get(key);
      if (cacheBody) {
        res.send(cacheBody);
      } else {
        var limit = parseInt(req.query.limit ?? 10);
        var keyword = req.query.name ?? null;
        var totalItem = 0;
        var totalPage = 0;
        var currentPage = parseInt(req.query.page ?? 1);
        jsonResult = JSON.parse(data);
        if (keyword) {
          jsonResult = jsonResult.filter(i => i.name.indexOf(keyword) > -1)
        }
        totalItem = jsonResult.length;
        totalPage = Math.ceil(totalItem / limit);
        jsonResult = jsonResult.slice(
          limit * currentPage - limit,
          limit * currentPage
        );
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        var body = {
          limit: limit,
          totalPage: totalPage,
          totalItem: totalItem,
          currentPage: currentPage,
          data: jsonResult,
        }
        cache.put(key, body)
        res.status(200).send(body);
      }

    });
  });
};

module.exports = emoijRoutes;
