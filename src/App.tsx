import * as React from "react";
import { hot } from "react-hot-loader/root";
import { MapEditorView } from "./components/MapEditorView/MapEditorView";
import { TopicMapItem } from "./types/TopicMapItem";

type AppProps = {
  setValue: (value: unknown) => void;
};

const App = ({ setValue }: AppProps): JSX.Element => {
  const updateItems = React.useCallback(
    (items: Array<TopicMapItem>) => {
      setValue({ items });
    },
    [setValue],
  );

  return (
    <div className="h5p-editor-topic-map">
      <MapEditorView updateItems={updateItems} />
    </div>
  );
};

export default hot(App);
