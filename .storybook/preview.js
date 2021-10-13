import "!style-loader!css-loader!sass-loader!../src/styles.scss";
import language from "../language/en.json";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ["Atoms", "Molecules", "Organisms", "Templates", "Pages"],
    },
  },
};

H5PEditor.language["H5PEditor.TopicMap"] = language;
