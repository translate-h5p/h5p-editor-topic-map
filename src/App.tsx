import * as React from "react";
import { hot } from "react-hot-loader/root";
import { MapEditorView } from "./components/MapEditorView/MapEditorView";
import { H5PField } from "./types/h5p/H5PField";
import { H5PForm } from "./types/h5p/H5PForm";
import { Params } from "./types/h5p/Params";
import { TopicMapItemType } from "./types/TopicMapItemType";

export type AppProps = {
  setValue: (field: H5PField, params: Params) => void;
  semantics: H5PField;
  params: Params;
  parent: H5PForm;
  topicMapItems: Array<TopicMapItemType>;
};

const App: React.FC<AppProps> = ({
  setValue,
  semantics,
  params,
  parent,
  topicMapItems,
}) => {
  const updateItems = React.useCallback(
    (items: Array<TopicMapItemType>) => {
      setValue(semantics, {
        topicMapItems: items,
      });
    },
    [semantics, setValue],
  );

  return (
    <div className="h5p-editor-topic-map">
      <MapEditorView
        updateItems={updateItems}
        initialGridItems={topicMapItems}
        semantics={semantics}
        params={params}
        parent={parent}
      />
    </div>
  );
};

export default hot(App);
