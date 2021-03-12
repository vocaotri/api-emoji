var cache = require('memory-cache');
var emoijService = require('../service/emoij.service');
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
      var key = req.query;
      var cacheBody = cache.get(key);
      if (cacheBody) {
        res.send(cacheBody);
      } else {
        var body = emoijService.emoij(req, data);
        cache.put(key, body)
        res.status(200).send(body);
      }
    });
  });
};

module.exports = emoijRoutes;
