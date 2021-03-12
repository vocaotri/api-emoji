var path = require('path');
const userRoutes = require("./emoij");
const appRouter = (app, fs) => {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,'..','views/index.html'));
  });
  userRoutes(app, fs);
};

module.exports = appRouter;
