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
  webpackFinal: async config => {
    // Removing the global alias as it conflicts with the global npm pkg (https://github.com/storybookjs/storybook/issues/21242)
    const { global, ...alias } = config.resolve.alias;
    config.resolve.alias = alias;

    addScssSupport(config);

    return config;
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: true,
  },
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
