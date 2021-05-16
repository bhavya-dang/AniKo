module.exports = {
    devServer: {
      proxy: {
        "^/search": {
          pathRewrite: { "^/search/": "/search/" },
          target: "https://api.jikan.moe/v3",
          ws: true,
          changeOrigin: true,
        },
      },
    },
  };
  