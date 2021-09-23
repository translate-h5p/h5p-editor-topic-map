import * as React from "react";
import { hot } from "react-hot-loader/root";
import { MapEditorView } from "./components/MapEditorView/MapEditorView";

type AppProps = {
  adjective: string;
  setValue: (value: any) => void;
};

const App = ({ adjective, setValue }: AppProps): JSX.Element => {
  return (
    <>
      <MapEditorView />
    </>
  );
};

export default hot(App);
