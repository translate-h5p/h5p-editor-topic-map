import * as React from "react";
import { hot } from "react-hot-loader/root";
import { MapEditorView } from "./components/MapEditorView/MapEditorView";
import { ArrowItemType } from "./types/ArrowItemType";
import { H5PField } from "./types/h5p/H5PField";
import { H5PForm } from "./types/h5p/H5PForm";
import { Params } from "./types/h5p/Params";
import { TopicMapItemType } from "./types/TopicMapItemType";

export type AppProps = {
  setValue: (params: Params) => void;
  semantics: H5PField;
  initialParams: Params;
  parent: H5PForm;
};

const App: React.FC<AppProps> = ({
  setValue,
  semantics,
  initialParams,
  parent,
}) => {
  const [params, setParams] = React.useState<Params>(initialParams);

  const updateItems = React.useCallback(
    (items: Array<TopicMapItemType>) => {
      const newParams: Params = {
        ...params,
        topicMapItems: items,
      };

      setParams(newParams);
      setValue(newParams);
    },
    [params, setValue],
  );

  const updateArrowItems = React.useCallback(
    (items: Array<ArrowItemType>) => {
      const newParams: Params = {
        ...params,
        arrowItems: items,
      };

      setParams(newParams);
      setValue(newParams);
    },
    [params, setValue],
  );

  return (
    <div className="h5p-editor-topic-map">
      <MapEditorView
        updateItems={updateItems}
        initialGridItems={params.topicMapItems}
        updateArrowItems={updateArrowItems}
        initialArrowItems={params.arrowItems}
        semantics={semantics}
        params={params}
        parent={parent}
      />
    </div>
  );
};

export default hot(App);
