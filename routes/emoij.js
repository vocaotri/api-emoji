const emoijRoutes = (app, fs) => {
  const dataPath = "./data/emoji.json";
  app.get("/emojis", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        throw err;
      }
      var limit = parseInt(req.query.limit ?? 10);
      var totalItem = 0;
      var totalPage = 0;
      var currentPage = parseInt(req.query.page ?? 1);
      jsonResult = JSON.parse(data);
      totalItem = jsonResult.length;
      totalPage = Math.ceil(totalItem / limit);
      jsonResult = jsonResult.slice(
        limit * currentPage - limit,
        limit * currentPage
      );
      res.send({
        limit: limit,
        totalPage: totalPage,
        totalItem: totalItem,
        currentPage: currentPage,
        data: jsonResult,
      });
    });
  });
};

module.exports = emoijRoutes;
