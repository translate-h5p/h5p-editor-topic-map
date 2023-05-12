const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  stories: [
    "../src/App.stories.tsx",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-addon-themes",
  ],
  core: {
    builder: "webpack5",
  },
  webpackFinal: async config => {
    addScssSupport(config);
    return config;
  },
  framework: {
    name: "@storybook/react",
  }
};

function addScssSupport(config) {
  config.plugins.push(new MiniCssExtractPlugin());

  config.module.rules.push({
    test: /\.module.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[name]__[local]--[hash:base64:5]",
          },
        },
      },
      "sass-loader",
    ],
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
    exclude: /\.module\.scss$/,
  });
}