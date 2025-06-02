module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [{ pattern: "tests/*.spec.ts" }],
    exclude: [],
    preprocessors: {
      "tests/*.spec.ts": ["webpack"],
    },
    webpack: {
      mode: "development",
      resolve: {
        extensions: [".ts", ".js"],
        fallback: {
          "fs": false,
          "path": require.resolve("path-browserify"),
          "crypto": require.resolve("crypto-browserify"),
          "stream": require.resolve("stream-browserify"),
          "util": require.resolve("util/"),
          "buffer": require.resolve("buffer/"),
          "assert": require.resolve("assert/"),
          "os": require.resolve("os-browserify/browser"),
          "url": require.resolve("url/"),
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "zlib": require.resolve("browserify-zlib"),
          "child_process": false,
        }
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: "ts-loader",
            exclude: /node_modules/,
          },
        ],
      },
      devtool: "inline-source-map",
    },
    reporters: ["progress"],
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ["ChromeHeadless"],
    mime: {
      "text/x-typescript": ["ts", "tsx"],
    },
    singleRun: true,
  });
};
