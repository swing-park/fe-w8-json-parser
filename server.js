const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config.js");
const compiler = webpack(webpackConfig);
const express = require("express");
const port = 9000;
const app = express();

app.get("/", (req, res, next) => {
  next();
});

app.use(
  middleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  })
);

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
