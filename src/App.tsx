import * as React from "react";
import { MapEditorView } from "./components/MapEditorView/MapEditorView";
import { H5PFieldGroup } from "./types/h5p/H5PField";
import { H5PForm } from "./types/h5p/H5PForm";
import { Params } from "./types/h5p/Params";
import {
  fillInMissingParamsProperties,
  getEmptyParams,
} from "./utils/H5P/form.utils";
import { defaultTheme } from "./utils/theme.utils";

export type AppProps = {
  setValue: (params: Params) => void;
  semantics: H5PFieldGroup;
  initialParams: Partial<Params> | undefined;
  parent: H5PForm;
};

export const App: React.FC<AppProps> = ({
  setValue,
  semantics,
  initialParams,
  parent,
}) => {
  const [params, setParams] = React.useState<Params>(
    initialParams
      ? fillInMissingParamsProperties(initialParams)
      : getEmptyParams(),
  );

  const updateParams = React.useCallback(
    (updatedParams: Partial<Params>) => {
      const newParams: Params = {
        ...params,
        ...updatedParams,
      };

      setParams(newParams);
      setValue(newParams);
    },
    [params, setValue],
  );

  const backgroundImage: string | undefined =
    params.appearance?.backgroundImage?.path;

  return (
    <div
      className={`h5p-editor-topic-map theme-${
        params.appearance?.colorTheme ?? defaultTheme
      }`}
      style={{ backgroundImage }}
    >
      <MapEditorView
        setParams={updateParams}
        semantics={semantics}
        params={params}
        parent={parent}
      />
    </div>
  );
};
