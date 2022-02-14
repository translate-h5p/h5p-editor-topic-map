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
  themes: {
    default: "Blue",
    list: [
      { name: "Blue", class: "theme-1", color: "#40586f" },
      { name: "Green", class: "theme-2", color: "#3d6060" },
      { name: "Red", class: "theme-3", color: "#981b1e" },
      { name: "Grey", class: "theme-4", color: "#373d3f" },
    ],
    target:
      ".h5p-editor-topic-map .h5p-editor-topic-map, .h5p-editor-topic-map",
    clearable: false,
  },
};

H5PEditor.language["H5PEditor.TopicMap"] = language;
