import * as React from "react";
import { hot } from "react-hot-loader/root";
import { MapEditorView } from "./components/MapEditorView/MapEditorView";
import { ArrowItemType } from "./types/ArrowItemType";
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
  arrowItems: Array<ArrowItemType>;
};

const App: React.FC<AppProps> = ({
  setValue,
  semantics,
  params,
  parent,
  topicMapItems,
  arrowItems,
}) => {
  const updateItems = React.useCallback(
    (items: Array<TopicMapItemType>) => {
      setValue(semantics, {
        topicMapItems: items,
        arrowItems,
      });
    },
    [arrowItems, semantics, setValue],
  );

  const updateArrowItems = React.useCallback(
    (items: Array<ArrowItemType>) => {
      setValue(semantics, {
        topicMapItems,
        arrowItems: items,
      });
    },
    [semantics, setValue, topicMapItems],
  );

  return (
    <div className="h5p-editor-topic-map">
      <MapEditorView
        updateItems={updateItems}
        initialGridItems={topicMapItems}
        updateArrowItems={updateArrowItems}
        initialArrowItems={arrowItems}
        semantics={semantics}
        params={params}
        parent={parent}
      />
    </div>
  );
};

export default hot(App);
