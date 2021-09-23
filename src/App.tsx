import * as React from "react";
import { hot } from "react-hot-loader/root";
import { MapEditorView } from "./components/MapEditorView/MapEditorView";

type AppProps = {
  setValue: (value: any) => void;
};

const App = ({ setValue }: AppProps): JSX.Element => {
  return (
    <>
      <MapEditorView />
    </>
  );
};

export default hot(App);
