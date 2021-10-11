import * as React from "react";
import { hot } from "react-hot-loader/root";
import { MapEditorView } from "./components/MapEditorView/MapEditorView";
import { H5PField } from "./types/h5p/H5PField";
import { Params } from "./types/h5p/Params";
import { TopicMapItemType } from "./types/TopicMapItemType";

type AppProps = {
  setValue: (field: H5PField, params: Params) => void;
  field: H5PField;
  topicMapItems: Array<TopicMapItemType>;
};

const App: React.FC<AppProps> = ({ setValue, field, topicMapItems }) => {
  const updateItems = React.useCallback(
    (items: Array<TopicMapItemType>) => {
      setValue(field, {
        topicMapItems: items,
      });
    },
    [field, setValue],
  );

  return (
    <div className="h5p-editor-topic-map">
      <MapEditorView
        updateItems={updateItems}
        initialGridItems={topicMapItems}
      />
    </div>
  );
};

export default hot(App);
