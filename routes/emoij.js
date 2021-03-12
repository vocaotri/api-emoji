var cache = require('memory-cache');
var emoijService = require('../service/emoij.service');
const emoijRoutes = (app, fs) => {
  const dataPath = "./data/emoji.json";
  app.get("/emojis", (req, res) => {
    var data = fs.readFileSync(dataPath, "utf8");
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.header('Access-Control-Allow-Origin', '*');
    var key = JSON.stringify(req.query);
    var cacheBody = cache.get(key);
    if (cacheBody) {
      res.send(cacheBody);
    } else {
      var body = emoijService.emoij(req, data);
      cache.put(key, body)
      res.send(body);
    }
  });
};

module.exports = emoijRoutes;
